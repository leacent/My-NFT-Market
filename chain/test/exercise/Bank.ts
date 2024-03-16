import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'
import { parseEther, formatEther } from 'viem'

import { type Bank } from '../../typechain-types'

describe('Bank', function () {
  const getWallet = async () => {
    const [wallet, a, b, c, d] = await hre.viem.getWalletClients()
    const publicClient = await hre.viem.getPublicClient()
    const [account] = await wallet.getAddresses()

    return { publicClient, account, a, b, c, d }
  }

  const deployBank = async () => {
    const bankContract = await hre.viem.deployContract('Bank')
    return {
      bankContract
    }
  }

  it('Test bank\'s deposit function', async () => {
    const { account } = await loadFixture(getWallet)
    const { bankContract } = await loadFixture(deployBank)
    const eth = parseEther('31.12')
    await bankContract.write.deposit([eth], {
      account
    })
    const balance = await bankContract.read.getBalance([account])

    expect(balance).to.equal(eth)
  })
})
