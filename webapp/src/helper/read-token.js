import { http, createPublicClient } from 'viem'
import { localhost } from 'viem/chains'
import tokenAbi from '../abi/my-token.json';

const wagmiContract = {
  abi: tokenAbi,
  address: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
}


const client = createPublicClient({
  chain: localhost,
  transport: http(),
})

export const readToken = async (account) => {
  const [name, totalSupply, symbol, balanceOf, accountBalance] = await Promise.all([
    client.readContract({
      ...wagmiContract,
      functionName: 'name',
    }),
    client.readContract({
      ...wagmiContract,
      functionName: 'totalSupply',
    }),
    client.readContract({
      ...wagmiContract,
      functionName: 'symbol',
    }),
    client.readContract({
      ...wagmiContract,
      functionName: 'balanceOf',
      args: [account],
    }),
    client.getBalance({
      address: account,
      blockTag: 'safe'
    })
  ])

  return {
    name, totalSupply, symbol, balanceOf, accountBalance
  }
}