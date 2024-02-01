import { task } from 'hardhat/config'

task('deployNFT', 'Deploy My NFT')
  .addParam('symbol', 'Specify your NFT symbol, which default to LOL')
  .setAction(
    async (_args, { ethers, run }) => {
      await run('compile')
      // const [deployer] = await ethers.getSigners()
      // const nonce = await deployer.getNonce()
      const name = 'LOL'
      const symbol: string = _args.symbol || 'LOL'
      const NFT = await ethers.getContractFactory('MyNFT')
      const [owner] = await ethers.getSigners()
      const nft = await NFT.deploy(name, symbol)

      console.log('owner', owner.address)
      console.log('NFT Deployed to :', nft.target)
      return nft.address
    }
  )

task('deployToken', 'Deploy my token')
  .setAction(
    async (_args, { ethers, run }) => {
      const name = 'leacent'
      const symbol = 'leacent'
      const TokenFactory = await ethers.getContractFactory('MyToken')
      const [owner] = await ethers.getSigners()
      const myToken = await TokenFactory.deploy(name, symbol)

      console.log('owner', owner.address)
      console.log('Token Deployed to :', myToken.target)
      // console.log('Token total supply is', await myToken.totalSupply())

      return myToken.target
    }
  )

task('deployMarket', 'Deloy NFT MarketPlace and NFT contract, prepare some data to market')
  .setAction(async (_args, { ethers, run }) => {
    const NFTMarketplaceFactory = await ethers.getContractFactory('NFTMarketplace')
    const NFTMarketplace = await NFTMarketplaceFactory.deploy()
    // 初始化一些数据
    console.log('NFTMarketplace deployed to ', NFTMarketplace.target)
  })
