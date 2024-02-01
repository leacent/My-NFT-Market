import { useEffect, useState } from 'react'
import { Text, Tag, Box, Flex, Button, Center, Divider, Input, useSafeLayoutEffect } from "@chakra-ui/react";
import { useAccount, useReadContract } from 'wagmi'
import NFTAbi from '../abi/my-nft.json'

const NFTMarketPlace = () => {
  const wagmiContract = {
    abi: NFTAbi,
    address: '0x35BaF1b562Fc8374e551dEE7228DB840EDc70369'
  }

  const { address } = useAccount()
  const {data: NFTBalance} = useReadContract({
    ...wagmiContract,
    functionName: 'balanceOf',
    args: [address],
  })

  
  return (
    <Box>
      <Center>
        { NFTBalance && NFTBalance.toString() }
      </Center>
    </Box>
  )
}

export default NFTMarketPlace