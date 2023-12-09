

using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService;

public class CheckAuctionFinished : BackgroundService
{
    private readonly ILogger<CheckAuctionFinished> _logger;
    private readonly IServiceProvider _service;

    public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger,IServiceProvider service)
  {
        _logger = logger;
        _service = service;
    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Start checking if there's any finished auction");
        stoppingToken.Register(() => _logger.LogInformation("==>auction check is finished"));

        while(!stoppingToken.IsCancellationRequested)
        {
          await checkAutctions(stoppingToken);
          await Task.Delay(5000,stoppingToken);
        }
    }

    private async  Task checkAutctions(CancellationToken stoppingToken)
    {
        var finishedAuction = await DB.Find<Auction>()
          .Match(x=>x.AuctionEnd <=DateTime.UtcNow)
          .Match(x=>!x.Finished)
          .ExecuteAsync(stoppingToken);

          if(finishedAuction.Count==0) return;  
          _logger.LogInformation("Found {count} completed auction", finishedAuction.Count);


          using var scope = _service.CreateScope();
          var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

          foreach(var auction in finishedAuction)
          {
            auction.Finished =true;
            await auction.SaveAsync(null,stoppingToken);

            var winningBid = await DB.Find<Bid>()
                  .Match(a=>a.AuctionId == auction.ID)
                  .Match(b=>b.BidStatus==BidStatus.Accepted)
                  .Sort(x=>x.Descending(y=>y.Amount))
                  .ExecuteFirstAsync(stoppingToken);

            await endpoint.Publish(new AuctionFinished{
              ItemSold = winningBid !=null,
              AuctionId = auction.ID,
              Amount = winningBid?.Amount,
              Winner = winningBid?.Bidder,
              Seller = auction.Seller
              },stoppingToken);
          }


    }
}
