import hre, { ethers, viem } from 'hardhat'
import { task } from 'hardhat/config'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'

const getWallet = async () => {
  const [wallet] = await hre.viem.getWalletClients()
  const [account] = await wallet.getAddresses()
  return { wallet, account }
}

task('DeployUniSwapFactory', 'Deploy uniswap V2 factory').setAction(async (_args, { ethers, run }) => {
  const { account } = await loadFixture(getWallet)
  const Factory = await ethers.getContractFactory('UniswapV2Factory')
  const UniswapV2FactoryDeployed = await Factory.deploy(account)

  console.log('UniswapV2Factory deployed to ', UniswapV2FactoryDeployed.target)
})
