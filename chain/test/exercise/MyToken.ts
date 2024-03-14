import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre, { ethers, viem } from 'hardhat'
import { type MyToken } from '../../typechain-types'

const getWallet = async () => {
  const [wallet, a, b, c, d] = await hre.viem.getWalletClients()
  const [account] = await wallet.getAddresses()
  return { account, a, b, c, d }
}

describe('MyToken', function () {
  async function deployMytoken () {
    const name = 'Leacent'
    const symbol = 'LEA'
    const MyTokenContract: MyToken = await hre.viem.deployContract('MyToken', [name, symbol])

    return { MyTokenContract }
  }

  it('Test token deploy functions', async () => {
    const { MyTokenContract } = await loadFixture(deployMytoken)
    const { account } = await loadFixture(getWallet)
    const deployer = await MyTokenContract.read.getDeployer()
    expect(deployer).to.equal(account)

    const ownBalance = await MyTokenContract.read.getBalance([account])
    const totalSupply = await MyTokenContract.read.totalSupply()
    expect(ownBalance).to.equal(totalSupply)
  })

  it('Test token transfer functions', async () => {
    const { MyTokenContract } = await loadFixture(deployMytoken)
    const { account, a: leacent } = await loadFixture(getWallet)
    const amount = 130 * 10 ** 18
    await MyTokenContract.write.transfer([leacent.account.address, amount], {
      account
    })

    const leacentBalance = await MyTokenContract.read.getBalance([leacent.account.address])
    expect(Number(leacentBalance)).to.equal(amount)
  })
})
