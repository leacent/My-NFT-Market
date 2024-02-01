import { publicClient, walletClient } from './client'
import nftAbi from '../abi/my-nft.json';
import { nftAddr } from './address'

export const writeNFT = async (account, mintTo) => {
  const { request } = await publicClient.simulateContract({
    account,
    address: nftAddr,
    abi: nftAbi,
    args: [mintTo],
    functionName: 'mintTo',
  })
  return walletClient.writeContract(request)
}

