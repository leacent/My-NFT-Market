import { http, createPublicClient } from 'viem'
import { sepolia } from 'viem/chains'
import nftAbi from '../abi/my-nft.json';

const wagmiContract = {
  abi: nftAbi,
  address: '0x35BaF1b562Fc8374e551dEE7228DB840EDc70369'
}

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
})


export const readNFT = async (account, tokenId) => {
  const [balanceOf, symbol, tokenURI ] = await Promise.all([
    client.readContract({
      ...wagmiContract,
      functionName: 'balanceOf',
      args: [account],
    }),
    client.readContract({
      ...wagmiContract,
      functionName: 'symbol',
    }),
    client.readContract({
      ...wagmiContract,
      args: [tokenId],
      functionName: 'tokenURI',
    }),
  ])

  return {
    balanceOf,
    symbol,
    tokenURI
  }
}