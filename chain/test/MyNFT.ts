import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { type MyNFT } from '../typechain-types'

describe('MyNFT', async function () {
  const name = 'LOL'
  const symbol = 'LOL'

  async function deployMyNFT () {
    const [owner, otherAccount] = await ethers.getSigners()
    const MyContract = await ethers.getContractFactory('MyNFT')
    const myNFT: MyNFT = await MyContract.deploy(name, symbol)
    return {
      myNFT,
      owner,
      otherAccount
    }
  }

  describe('Deployment', function () {
    it('Should set the rigth token name and symbol', async () => {
      const { myNFT } = await loadFixture(deployMyNFT)
      const mySymbol = await myNFT.symbol()
      expect(mySymbol).to.equal(symbol)

      const myName = await myNFT.name()
      expect(myName).to.equal(name)
    })
  })

  describe('Mint MyNFT', () => {
    it('The address should equal to reciept address', async () => {
      const { myNFT, otherAccount } = await loadFixture(deployMyNFT)
      const address = otherAccount.address
      let tokenId = 0
      // mint one NFT to address
      await myNFT.mintTo(address)
      expect(await myNFT.ownerOf(tokenId)).to.equal(address)

      // Incremental token ids should be equal
      await myNFT.mintTo(address)
      tokenId += 1
      expect(await myNFT.ownerOf(tokenId)).to.equal(address)
      expect(Number(await myNFT.balanceOf(address))).to.equal(2)
    })

    it('should return correctly mint number', async () => {
      const { myNFT, otherAccount } = await loadFixture(deployMyNFT)
      const address = otherAccount.address

      await myNFT.mintTo(address)
      await myNFT.mintTo(address)
      const list = await myNFT.getMyNFTList(address)
      console.log('list', list)
      expect(list.length).to.be.equal(2)
    })
  })
})
