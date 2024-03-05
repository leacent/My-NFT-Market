import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre, { ethers, viem } from 'hardhat'
import { type UniswapV2Router02, type MyToken, type UniswapV2Pair } from '../typechain-types'
import { bytecode } from '../artifacts/contracts/UniswapV2Router02.sol/IUniswapV2Pair.json'

const getWallet = async () => {
  const [wallet] = await hre.viem.getWalletClients()
  const [account] = await wallet.getAddresses()
  return { wallet, account }
}

const deployToken = async () => {
  const name1 = 'leacent1'
  const name2 = 'leacent2'
  const symbol1 = 'leacent1'
  const symbol2 = 'leacent2'
  const { account } = await loadFixture(getWallet)
  const myToken1 = await hre.viem.deployContract('MyToken', [name1, symbol1])
  const myToken2 = await hre.viem.deployContract('MyToken', [name2, symbol2])

  return { myToken1, myToken2 }
}

const deployRouter = async () => {
  const { account } = await loadFixture(getWallet)
  const { myToken1, myToken2 } = await loadFixture(deployToken)
  const { factory } = await loadFixture(deployFactory)
  const router = await hre.viem.deployContract('UniswapV2Router02', [factory.address, myToken1.address])
  return { router }
}

const deployFactory = async () => {
  const { account } = await loadFixture(getWallet)
  const factory = await hre.viem.deployContract('UniswapV2Factory', [account])
  return {
    factory
  }
}

describe('Test UniswapV2Router02', async () => {
  it('Test add liquidity', async function () {
    const { myToken1, myToken2 } = await loadFixture(deployToken)
    const { router } = await loadFixture(deployRouter)
    const { account } = await loadFixture(getWallet)
    const { factory } = await loadFixture(deployFactory)
    console.log('account', account)

    await myToken1.write.approve([router.address, parseInt('1000', 18)], {
      account
    })
    // await myToken2.write.approve([router.address, parseInt('100', 18)])

    // await router.write.addLiquidity([myToken1.address, myToken2.address, ethers.parseUnits('1000', 18), ethers.parseUnits('100', 18), 0, 0, account, Date.now()])
    // const length = await factory.read.allPairsLength()
    // console.log('length', length.toString())
  })
})

// describe('Test UniswapV2Router02', async () => {
//   const Weth = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'

//   async function deployUniswapV2Router02 () {
//     const [account, owner1] = await ethers.getSigners()
//     const Contract = await ethers.getContractFactory('UniswapV2Router02')
//     const Factory = await ethers.getContractFactory('UniswapV2Factory')
//     const factoryAddress = await Factory.deploy(account.address)

//     const contract: UniswapV2Router02 = await Contract.deploy(factoryAddress.target, Weth)

//     return {
//       account,
//       contract,
//       owner1,
//       factoryAddress: factoryAddress.target
//     }
//   }

//   async function getERC20Token () {
//     const name1 = 'leacent1'
//     const name2 = 'leacent2'
//     const symbol1 = 'leacent1'
//     const symbol2 = 'leacent2'

//     const MyContract = await ethers.getContractFactory('MyToken')
//     const token1: MyToken = await MyContract.deploy(name1, symbol1)
//     const token2: MyToken = await MyContract.deploy(name2, symbol2)

//     return {
//       token1: token1.target,
//       token2: token2.target
//     }
//   }

//   it('Test add liquidity', async () => {
//     const { contract, account } = await loadFixture(deployUniswapV2Router02)
//     const { token1, token2 } = await loadFixture(getERC20Token)
//     console.log('token2', token2)
//     await account.approve(contract.target)
//     await contract.addLiquidity(token1, token2, ethers.parseUnits('1000', 18), ethers.parseUnits('1000000000', 18), 0, 0, account.address, Date.now())
//   })
// })
