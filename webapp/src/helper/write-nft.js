import { publicClient, walletClient } from './client'
import nftAbi from '../abi/my-nft.json';

export const writeNFT = async (account, mintTo) => {
  const { request } = await publicClient.simulateContract({
    account,
    address: '0x35BaF1b562Fc8374e551dEE7228DB840EDc70369',
    abi: nftAbi,
    args: [mintTo],
    functionName: 'mintTo',
  })
  return walletClient.writeContract(request)
}

