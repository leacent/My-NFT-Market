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
      const nft = await NFT.deploy(name, symbol)

      // await nft.deployed()
      const agetAddress = await nft.getAddress()

      console.log('agetAddress', agetAddress)

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
