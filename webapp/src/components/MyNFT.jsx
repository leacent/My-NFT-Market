import { useEffect, useState } from 'react'
import { Heading, Text, Tag, Box, Flex, Button, Center, Divider, Input, useSafeLayoutEffect } from "@chakra-ui/react";
import { useAccount, useReadContracts, useSignTypedData } from 'wagmi'
import NFTAbi from '../abi/my-nft.json'
import { writeNFT } from '../helper'
import { nftAddr } from '../helper/address'




const wagmiContract = {
  abi: NFTAbi,
  address: nftAddr
}

const NFTMarketPlace = () => {
  const [isLoading, setIsLoading] = useState(false)
  // const [symbol, setSymbol] = useState(false)
  // const [balance, setBalance] = useState(false)
  const { address: account  } = useAccount()
    const { data = [] } = useReadContracts({
    contracts: [
      {
        ...wagmiContract,
        functionName: "balanceOf",
        args: [account],
      },
      {
        ...wagmiContract,
        functionName: 'symbol',
      }
    ]
  })

  const onMint = () => {
    setIsLoading(true)
    writeNFT(account, account).then(res => {
      console.log('onMint res', res);
      setIsLoading(false)
    }).catch(error => {
      console.error(error);
      setIsLoading(false)
    })
  }

  let balance = 0
  let symbol = ''
  
  if (data.length === 2) {
    balance = data[0]?.result
    symbol = data[1]?.result
  }
  
  return (
    <div>
      <Box>
        <Center mt="16px" mb="16px">
          <Heading as='h1'>Let's Get {symbol} NFT</Heading>
        </Center>
        <Center mb="60px">
          <Text fontWeight="bold" fontSize="18px">Minted({symbol}): { balance.toString() || 0 }</Text>
        </Center>
      </Box>
      <Box>
        <Center>
          <Button 
            isLoading={isLoading} 
            onClick={onMint} 
            size="lg" 
            colorScheme='yellow'>Mint Now</Button>
        </Center>
      </Box>
    </div>
  )
}

export default NFTMarketPlace