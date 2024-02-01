// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract NFTMarketplace is ReentrancyGuard {
  uint256 private _itemCounter;
  uint256 private _itemSoldCounter;
  
  address payable public marketowner;
  uint256 public listingFee = 0.01 ether;
  enum State { Created, Release, Inactive }

  struct MarketItem {
    uint256 id;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable buyer;
    uint256 price;
    State state;
  }

  mapping (uint256 => MarketItem) private marketItems;
  
  event MarketItemCreated (
    uint indexed id,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address buyer,
    uint256 price,
    State state
  );

  event MarketItemSold (
    uint indexed id,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address buyer,
    uint256 price,
    State state
  );

  constructor() {
    marketowner = payable(msg.sender);
  }

  function getListingFee() public view returns (uint256) {
    return listingFee;
  }

  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {

    require(price > 0, "Price must be at least 1 wei");
    require(msg.value == listingFee, "Fee must be equal to listing fee");

    require(IERC721(nftContract).getApproved(tokenId) == address(this), "NFT must be approved to market");

    _itemCounter += 1;
    uint256 id = _itemCounter;

    marketItems[id] =  MarketItem(
      id,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      State.Created
    );
    emit MarketItemCreated(
      id,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      State.Created
    );
  }

  function deleteMarketItem(uint256 itemId) public nonReentrant {
    require(itemId <= _itemCounter, "id must <= item count");
    require(marketItems[itemId].state == State.Created, "item must be on market");
    MarketItem storage item = marketItems[itemId];

    require(IERC721(item.nftContract).ownerOf(item.tokenId) == msg.sender, "must be the owner");
    require(IERC721(item.nftContract).getApproved(item.tokenId) == address(this), "NFT must be approved to market");

    item.state = State.Inactive;

    emit MarketItemSold(
      itemId,
      item.nftContract,
      item.tokenId,
      item.seller,
      address(0),
      0,
      State.Inactive
    );

  }

  // nonReentrant 防止重入攻击
  function buy(address nftContract, uint256 id) public payable nonReentrant () {
    MarketItem storage item = marketItems[id];

    uint256 price = item.price;
    uint256 tokenId = item.tokenId;

    require(msg.value == price, "Please submit the asking price");
    require(IERC721(nftContract).getApproved(tokenId) == address(this), "NFT must be approved to market");

    IERC721(nftContract).transferFrom(item.seller, msg.sender, tokenId);

    payable(marketowner).transfer(listingFee);
    
    item.seller.transfer(msg.value);
    item.buyer = payable(msg.sender);
    item.state = State.Release;
    _itemSoldCounter += 1;
    
    emit MarketItemSold(
      id,
      nftContract,
      tokenId,
      item.seller,
      msg.sender,
      price,
      State.Release
    );
  }
  
  // Returns only market items a user has purchased
  function fetchActiveItems() public view returns (MarketItem[] memory) {
    return fetchHepler(FetchOperator.ActiveItems);
  }
  
  enum FetchOperator { ActiveItems, MyPurchasedItems, MyCreatedItems }
  
  // Returns only market items a user has purchased
  function fetchMyPurchasedItems() public view returns (MarketItem[] memory) {
    return fetchHepler(FetchOperator.MyPurchasedItems);
  }
  
  // Returns only market items a user has created
  function fetchMyCreatedItems() public view returns (MarketItem[] memory) {
    return fetchHepler(FetchOperator.MyCreatedItems);
  }

  function fetchHepler(FetchOperator _op) private view returns (MarketItem[] memory) {     
    uint total = _itemCounter;
    uint itemCount = 0;
    
    for (uint i = 1; i <= total; i++) {
      if (isCondition(marketItems[i], _op)) {
        itemCount ++;
      }
    }

    uint index = 0;
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 1; i <= total; i++) {
      if (isCondition(marketItems[i], _op)) {
        items[index] = marketItems[i];
        index ++;
      }
    }
    return items;
  } 

  function isCondition(MarketItem memory item, FetchOperator _op) private view returns (bool){
    if(_op == FetchOperator.MyCreatedItems){ 
      return 
        (item.seller == msg.sender
          && item.state != State.Inactive
        )? true
         : false;
    }else if(_op == FetchOperator.MyPurchasedItems){
      return
        (item.buyer ==  msg.sender) ? true: false;
    }else if(_op == FetchOperator.ActiveItems){
      return 
        (item.buyer == address(0) 
          && item.state == State.Created
          && (IERC721(item.nftContract).getApproved(item.tokenId) == address(this))
        )? true
         : false;
    }else{
      return false;
    }
  }
  
}
