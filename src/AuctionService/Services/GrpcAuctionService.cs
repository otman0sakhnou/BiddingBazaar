using AuctionService.Data;
using Grpc.Core;

namespace AuctionService;

public class GrpcAuctionService : GrpcAuction.GrpcAuctionBase
{
  private readonly AuctionDbContext _dbContext;

  public GrpcAuctionService(AuctionDbContext dbContext)
  {
    _dbContext = dbContext;
  }
  public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest auctionRequest, ServerCallContext serverCall)
  {
    Console.WriteLine("==> Received Grpc request for auction");
    var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(auctionRequest.Id));

    if (auction == null) throw new RpcException(new Status(StatusCode.NotFound, "Not Found"));

    var response = new GrpcAuctionResponse
    {
      Auction = new GrpcAuctionModel
      {
        Id = auction.Id.ToString(),
        AuctionEnd = auction.AuctionEnd.ToString(),
        Seller = auction.Seller,
        ReserPrice = auction.ReservePrice
      }
    };
    return response;
  }
}
