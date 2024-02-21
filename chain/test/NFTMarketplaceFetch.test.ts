import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { type Signer, toBigInt } from "ethers";
import { type MyNFT, type NFTMarketplace } from "../typechain-types";

const _name = "leacent";
const _symbol = "leacent";
let account0: Signer;
let account1: Signer;
let account2: Signer;
const auctionPrice = ethers.parseUnits("1", "ether");
let listingFee: number;
let address1: string;
let address0: string;
let address2: string;

describe("Test the function of reading NFT Market", () => {
  let nft: MyNFT;
  let market: NFTMarketplace;

  beforeEach(async function () {
    [account0, account1, account2] = await ethers.getSigners();

    address0 = await account0.getAddress();
    address1 = await account1.getAddress();
    address2 = await account2.getAddress();

    const BadgeToken = await ethers.getContractFactory("MyNFT");
    nft = await BadgeToken.deploy(_name, _symbol);

    const Market = await ethers.getContractFactory("NFTMarketplace");
    market = await Market.deploy();
    listingFee = await market.getListingFee();

    // 1-6的 id  mint 给 address0
    for (let i = 1; i <= 6; i++) {
      await nft.mintTo(address0);
    }

    for (let i = 7; i <= 9; i++) {
      // 这里的 connect是模拟 account1作为 msg.sender（合约调用者）
      await nft.connect(account1).mintTo(address1);
    }

    for (let i = 1; i <= 6; i++) {
      await nft.approve(market.target, i);
      // 上架
      await market.createMarketItem(nft.target, i, auctionPrice, {
        value: listingFee,
      });
    }
  });

  it("Should fetchMyPurchasedItems correctly", async () => {
    const items = await market.fetchMyPurchasedItems();
    expect(items.length).to.be.equal(0);
  });

  it("should fetch my created items correctly", async () => {
    const createdItems = await market.fetchMyCreatedItems();
    console.log("createdItems", createdItems.length);
    expect(createdItems.length).to.be.equal(6);
  });

  it("should delete correctly", async () => {
    await market.deleteMarketItem(1);
    const currentItems = await market.fetchMyCreatedItems();
    expect(currentItems.length).to.be.equal(5);
  });

  it("should fetch my purchased item correctly", async () => {
    const items = await market.fetchMyPurchasedItems();
    expect(items.length).to.be.equal(0);
  });

  it("Test fetch active items", async () => {
    const items = await market.fetchActiveItems();
    const currentItem = items[0];
    expect(currentItem.id).to.be.equal(toBigInt(1));
    expect(currentItem.nftContract).to.be.equal(nft.target);
    expect(currentItem.tokenId).to.be.equal(toBigInt(1));
    expect(currentItem.buyer).to.be.equal(ethers.ZeroAddress);
    expect(currentItem.seller).to.be.equal(address0);
  });
});
