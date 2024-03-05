import hre, { ethers } from 'hardhat'

async function main () {
  const [account] = await ethers.getSigners()

  const uniswapV2Factory = await ethers.deployContract('UniswapV2Factory', [account.address])
  // 0x5FbDB2315678afecb367f032d93F642f64180aa3

  const router = await ethers.deployContract('UniswapV2Router02', [uniswapV2Factory.target, '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9'])
  console.log('router', router.target)
  // 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
