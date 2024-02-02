import { custom, createWalletClient, createPublicClient, http } from 'viem'
import { localhost, sepolia } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum),
})