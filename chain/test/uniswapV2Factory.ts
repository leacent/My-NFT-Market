// WETH  0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { type UniswapV2Factory, type MyToken } from '../typechain-types'

describe('Test uniswapV2Factory', async () => {
  async function deployUniswapV2Factory () {
    const [account, owner1, owner2, owner3] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory('UniswapV2Factory')
    const contract: UniswapV2Factory = await Contract.deploy(account.address)
    console.log('account.address', account.address)

    return {
      account, contract, owner1
    }
  }

  async function getERC20Token () {
    const name1 = 'leacent1'
    const name2 = 'leacent2'
    const symbol1 = 'leacent1'
    const symbol2 = 'leacent2'

    const MyContract = await ethers.getContractFactory('MyToken')
    const token1: MyToken = await MyContract.deploy(name1, symbol1)
    const token2: MyToken = await MyContract.deploy(name2, symbol2)

    return {
      token1,
      token2
    }
  }

  it('Test feeTo address', async () => {
    const { contract, account } = await loadFixture(deployUniswapV2Factory)
    const feeToSetterAddress = await contract.feeToSetter()
    expect(feeToSetterAddress).to.equal(account.address)
  })

  it('Create token pair should work', async () => {
    const { token1, token2 } = await loadFixture(getERC20Token)
    const { contract } = await loadFixture(deployUniswapV2Factory)

    await contract.createPair(token1, token2)
    await contract.getPair(token1, token2)

    const length = await contract.allPairsLength()

    expect(Number(length)).to.equal(1)
  })

  // it('feTo address can be reset to another address', async () => {
  //   const { contract, account, owner1 } = await loadFixture(deployUniswapV2Factory)
  //   await contract.setFeeToSetter(owner1.address)
  //   const newAddr = await contract.feeTo()
  //   console.log('owner1.address', owner1.address)
  //   console.log('account', account.address)
  //   console.log('newAddr', newAddr)
  // })
})
