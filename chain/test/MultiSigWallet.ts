import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { type MultiSigWallet } from '../typechain-types'

describe('Test MultiSigWallet', async () => {
  async function deployMultiSigWallet () {
    const [account, owner1, owner2, owner3] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory('MultiSigWallet')
    const contract: MultiSigWallet = await Contract.deploy([account.address, owner2.address, owner3.address], 2)
    return {
      account, owner1, owner2, owner3, contract
    }
  }

  it('should submit a transaction', async () => {
    const { contract, account, owner1 } = await loadFixture(deployMultiSigWallet)
    await contract.submitTransaction(account.address, 100, '0x')
    const txCount = await contract.getTransctionCount()
    expect(Number(txCount)).to.equal(1)
  })
})
