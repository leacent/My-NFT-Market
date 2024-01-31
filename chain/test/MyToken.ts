import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('My ERC20 Token', () => {
  const name = 'leacent'
  const symbol = 'leacent'

  async function getMyContract () {
    const [owner, otherAccount] = await ethers.getSigners()
    const MyContract = await ethers.getContractFactory('MyToken')
    const myToken = await MyContract.deploy(name, symbol)

    return {
      myToken,
      owner,
      otherAccount
    }
  }

  it('Token symbol should be leacent', async () => {
    const { myToken } = await loadFixture(getMyContract)
    expect(await myToken.symbol()).to.equal(symbol)
    expect(await myToken.name()).to.equal(name)
  })

  it('Token totalSupply should be 10000 ether', async () => {
    const { myToken } = await loadFixture(getMyContract)
    const totalSupply = await myToken.totalSupply()
    expect(totalSupply).to.equal(ethers.parseEther('10000'))
  })
})
