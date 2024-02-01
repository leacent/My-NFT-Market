import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { type Signer } from 'ethers'
import { type MyNFT, type NFTMarketplace } from '../typechain-types'

const _name = 'leacent'
const _symbol = 'leacent'
let account0: Signer
let account1: Signer
let account2: Signer
const auctionPrice = ethers.parseUnits('1', 'ether')
let listingFee: number
let address1: string
let address0: string
let address2: string

describe('Test the operation function of the nft market place', () => {
  let nft: MyNFT
  let market: NFTMarketplace

  beforeEach(async function () {
    [account0, account1, account2] = await ethers.getSigners()

    address0 = await account0.getAddress()
    address1 = account1.getAddress()
    address2 = account2.getAddress()

    const BadgeToken = await ethers.getContractFactory('MyNFT')
    nft = await BadgeToken.deploy(_name, _symbol)

    const Market = await ethers.getContractFactory('NFTMarketplace')
    market = await Market.deploy()
    listingFee = await market.getListingFee()
  })

  it('Should create market item successfully', async function () {
    await nft.mintTo(address0) // tokenId=1
    await nft.approve(market.target, 1)
    await market.createMarketItem(nft.target, 1, auctionPrice, { value: listingFee })

    const items = await market.fetchMyCreatedItems()
    expect(items.length).to.be.equal(1)
  })

  // TODO: revertedWith报错
  // it('Should revert to create market item if nft is not approved', async function () {
  //   await nft.mintTo(address0) // tokenId=1
  //   // await nft.approve(market.address,1)
  //   await expect(market.createMarketItem(nft.target, 1, auctionPrice, { value: listingFee }))
  //     .to.be.revertedWith('NFT must be approved to market')
  // })

  // Error: Invalid Chai property: reverted
  // it('Should revert buy if seller remove approve', async function () {
  //   await nft.mintTo(address0) // tokenId=1
  //   await nft.approve(market.target, 1)
  //   await market.createMarketItem(nft.target, 1, auctionPrice, { value: listingFee })

  //   await nft.approve(ethers.ZeroAddress, 1)

  //   await expect(market.connect(account1).buy(nft.target, 1, { value: auctionPrice }))
  //     .to.be.reverted
  // })
})
