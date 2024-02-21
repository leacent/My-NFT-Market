import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hh, { ethers } from 'hardhat'
import { type NftFactory, type NftCollection } from '../typechain-types'

describe('Test NFT factory', () => {
  async function getContract () {
    const [owner, otherAccount] = await ethers.getSigners()
    const nftFactoryContract = await ethers.getContractFactory('NftFactory')
    const nftFactory: NftFactory = await nftFactoryContract.deploy(owner)
    return {
      nftFactory,
      owner,
      otherAccount
    }
  }

  it('Nft factory should deloy NFT use by NftCollection correctly', async () => {
    const { nftFactory } = await loadFixture(getContract)
    const name = 'lol'
    const symbol = 'lol'
    const maxSupply = 10000
    const mintPrice = ethers.parseEther('1')
    const salt = ethers.encodeBytes32String('test')
    const salt2 = ethers.encodeBytes32String('test2')

    await nftFactory.deployNft(name, symbol, maxSupply, mintPrice, salt)
    console.log((await nftFactory.getClonedAddress()).length)

    // const cloned1: string = await nftFactory.getClonedAddress(0)
    // const deployedNftCollection: NftCollection = await ethers.getContractAt('NftCollection', cloned1)

    // const addr = await nftFactory.getClonedAddress(0)
    // const addr2 = await nftFactory.getClonedAddress(1)
    // console.log('addr', addr)
    // console.log('nftFactory.clonedContracts.length', nftFactory.clonedContracts.length)
  })
})
