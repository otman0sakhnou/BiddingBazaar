using AuctionService.Data;
using AuctionService.Data.Migrations;
using Contracts;
using MassTransit;

namespace AuctionService;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly AuctionDbContext _dbContext;

    public BidPlacedConsumer(AuctionDbContext dbContext)
  {
        _dbContext = dbContext;
    }
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Consuming Bid placed");

        var auction = await _dbContext.Auctions.FindAsync(context.Message.AuctionId);


        if(auction.CurrentHighBid == null 
        || context.Message.BidStatus.Contains("Accepted") 
        && auction.CurrentHighBid<context.Message.Amount )
        {
          auction.CurrentHighBid = context.Message.Amount;
          await  _dbContext.SaveChangesAsync();
        }

    }
}
