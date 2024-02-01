import { http, createPublicClient } from 'viem'
import nftAbi from '../abi/my-nft.json';
import { publicClient } from './client'
import { nftAddr } from './address'

const wagmiContract = {
  abi: nftAbi,
  address: nftAddr
}

export const readNFT = async (account, tokenId) => {
  const [balanceOf, symbol, tokenURI ] = await Promise.all([
    publicClient.readContract({
      ...wagmiContract,
      functionName: 'balanceOf',
      args: [account],
    }),
    publicClient.readContract({
      ...wagmiContract,
      functionName: 'symbol',
    }),
    publicClient.readContract({
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