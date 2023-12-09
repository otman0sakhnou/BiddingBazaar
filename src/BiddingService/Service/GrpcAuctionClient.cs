using AuctionService;
using Google.Protobuf;
using Grpc.Net.Client;

namespace BiddingService;

public class GrpcAuctionClient
{
    private readonly ILogger<GrpcAuctionClient> _logger;
    private readonly IConfiguration _conf;

  public GrpcAuctionClient(ILogger<GrpcAuctionClient> logger, IConfiguration conf)
  {
        _logger = logger;
        _conf = conf;
  }

  public Auction GetAuction(string id)
  {
    _logger.LogInformation("==>Calling Grpc service");
    var channel = GrpcChannel.ForAddress(_conf["GrpcAuction"]);
    var client = new GrpcAuction.GrpcAuctionClient(channel);
    var request = new GetAuctionRequest{Id = id};

    try
    {
      var reply = client.GetAuction(request);
      var auction = new Auction{
        ID = reply.Auction.Id,
        AuctionEnd = DateTime.Parse(reply.Auction.AuctionEnd),
        Seller = reply.Auction.Seller,
        ReservePrice = reply.Auction.ReserPrice
      };
      return auction;
    }
    catch (System.Exception)
    { 
      _logger.LogInformation("==>Cannot call the GRPC Server");
      return null;
    }
  }

}
