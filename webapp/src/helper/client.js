import { custom, createWalletClient, createPublicClient, http } from 'viem'
import { localhost, sepolia } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: localhost,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: localhost,
  transport: custom(window.ethereum),
})