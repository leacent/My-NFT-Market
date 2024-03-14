import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre, { ethers, viem } from 'hardhat'
import { type TokenSwap, type MyToken } from '../../typechain-types'

const token1Name = 'token1'
const token1Symbol = 'token1'
const token2Name = 'token2'
const token2Symbol = 'token2'

const getWallet = async () => {
  const [account0, account1, account2] = await hre.viem.getWalletClients()
  return { account0, account1, account2 }
}

const initTokenAndAddress = async () => {
  let { account0, account1, account2 } = await loadFixture(getWallet)
  account1 = account1.account.address
  account2 = account2.account.address
  const token1 = await hre.viem.deployContract('MyToken', [token1Name, token1Symbol], { account: account1 })
  const token2 = await hre.viem.deployContract('MyToken', [token2Name, token2Symbol], { account: account2 })
  const amount = 130 * 10 ** 18

  console.log('token1.deployer', await token1.read.getDeployer())
  console.log('token2.deployer', await token2.read.getDeployer())

  // await token1.write.transfer([account1, amount])
  // await token2.write.transfer([account2, amount])

  return {
    token1,
    token2,
    account0,
    account1,
    account2
  }
}

const deployTokenSwap = async () => {
  const { token1, token2, account0, account1, account2 } = await loadFixture(initTokenAndAddress)
  const amount = 120 * 10 ** 18
  const params = [token1.address, account1, amount, token2.address, account2, amount]
  const swapContract = await hre.viem.deployContract('TokenSwap', params)

  return { swapContract, token1, token2, account1, account2 }
}

describe('TokenSwap', async () => {
  it('Test Init', async () => {
    const { swapContract, token1, token2, account1, account2 } = await loadFixture(deployTokenSwap)

    // console.log('balance', await token1.read.balanceOf([account1]))
    const amount = 1200 * 10 ** 18

    await token1.write.approve([swapContract.address, amount])
    await token2.write.approve([swapContract.address, amount])

    const allowanceAmount = await swapContract.read.allowance([swapContract.address])
    console.log('allowanceAmount', allowanceAmount)

    await swapContract.write.swap([], {
      account: account1
    })

    // const bal = await token1.read.balanceOf([account1])

    // console.log('bal', bal)
  })
})
