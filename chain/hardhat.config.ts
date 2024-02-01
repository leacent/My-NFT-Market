import { type HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'
import './task/deploy'

require('@nomicfoundation/hardhat-chai-matchers')

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/MZplpiCc0hxfezJoP8IlQj7zfEFGZk6Y',
      accounts: ['0x8f9eff6cd3d04e39538acb78824756e9a2dfefd5a88fda7d56686ca6b5b8c955']
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    goerli: {
      url: process.env.GOERLI_URL || '',
      accounts: process.env.PRIVATE_KEY !== undefined
        ? [process.env.PRIVATE_KEY]
        : []
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD'
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}

export default config
