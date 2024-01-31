import { useEffect, useState } from 'react'
import { Tag, Box, Flex, Button, Center } from "@chakra-ui/react";
import 'viem/window'
import { formatEther } from 'viem'
import { publicClient, walletClient } from '../helper'
import { readContractByAddress } from '../helper/read-contract'


const ChainIndex = () => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [total, setTotal] = useState(null);
  const [balance, setBalance] = useState(null);

  const connect = async () => {
    const [ address] = await walletClient.requestAddresses()
    setAccount(address)
    walletClient.getChainId().then(chainId => setChainId(chainId))
  }

  useEffect(() => {
    if (account) {
      connect()

      const readContract = async () => {
        const { symbol, balanceOf, totalSupply, accountBalance} = await readContractByAddress(account)
        setBalance(formatEther(accountBalance))
        setSymbol(symbol.toString())
        setTokenBalance(formatEther(balanceOf))
        setTotal(formatEther(totalSupply))
      }
      
      readContract()
    }
  }, [account])

  if (!account) {
    return (
      <Center marginTop="20px" h="200px">
        <Button onClick={connect} colorScheme='teal' size='md'>
          Connect Wallet
        </Button>

      </Center>
    )
  }

  return(
    <>
      <Flex color='#333' marginTop="20px">
        <Center w='200px' fontWeight="bold">Account: </Center>
        <Center><Tag size="lg" colorScheme='green'>{account}</Tag></Center>
      </Flex>
      <Flex color='#333' marginTop="20px">
        <Center w='200px' fontWeight="bold">Balance(ETH): </Center>
        <Center><Tag size="lg" colorScheme='green'>{balance}</Tag></Center>
      </Flex>
      <Flex color='#333' marginTop="20px">
        <Center w='200px' fontWeight="bold">ChainId: </Center>
        <Center><Tag size="lg" colorScheme='green'>{chainId}</Tag></Center>
      </Flex>
      <Flex color='#333' marginTop="20px">
        <Center w='200px' fontWeight="bold">Balance({symbol}): </Center>
        <Center><Tag size="lg" colorScheme='green'>{tokenBalance}</Tag></Center>
      </Flex>
      <Flex color='#333' marginTop="20px">
        <Center w='200px' fontWeight="bold">Token Total Supply: </Center>
        <Center><Tag size="lg" colorScheme='green'>{total}</Tag></Center>
      </Flex>
    </>
  )
}

export default ChainIndex