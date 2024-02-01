import { useEffect, useState } from 'react'
import { Text, Tag, Box, Flex, Button, Center, Divider, Input, useSafeLayoutEffect } from "@chakra-ui/react";
import 'viem/window'
import { useReadContract, useAccount } from 'wagmi'
import NFTAbi from '../abi/my-nft.json'

import { formatEther } from 'viem'
import { publicProvider } from 'wagmi/providers/public';

import { writeNFT, walletClient, readNFT, readToken } from '../helper'

const wagmiContract = {
  abi: NFTAbi,
  address: '0x35BaF1b562Fc8374e551dEE7228DB840EDc70369'
}

const ChainIndex = () => {
  const [nftSymbol, setNftSymbol] = useState('')
  const [NFTBalance, setNftBalance] = useState('')
  const [mintAddress, setMintAddress] = useState('')
  const [mintLoading, setMintLoading] = useState(false)
  const [tokenURI, setTokenURI] = useState('')
  const [itemInfo, setItemInfo] = useState(null)
  const { address } = useAccount()

  console.log('address', address);

  // const { balance } = useReadContract({
  //   ...wagmiContract,
  //   functionName: 'balanceOf',
  //   args: ['0xa6c3D1258104db18ae86f95E25c940388977ab87'],
  // })

  // useEffect(() => {
  //   if (account) {
  //     connect()

  //     const readContract = async () => {
  //       const { symbol, balanceOf, totalSupply, accountBalance} = await readToken(account)
  //     }
  //     readContract()

  //     const readNFTContract = async () => {
  //       const { symbol, balanceOf: NFTBalance, tokenURI} = await readNFT(account, '1')
  //       setNftSymbol(symbol.toString())
  //       setNftBalance(NFTBalance.toString())
  //       console.log('tokenURI', tokenURI);
  //       setTokenURI(tokenURI)
  //     }
  //     readNFTContract()
  //   }
  // }, [account])

  // useEffect( () => {
  //   if(!tokenURI) return

  //   const data = window.atob(tokenURI.slice(29))
  //   const itemInfo = JSON.parse(data)
  //   const svg = window.atob(itemInfo.image.slice(26))
    
  //   setItemInfo({
  //     "name":itemInfo.name,
  //     "description":itemInfo.description,
  //     "svg":svg
  //   })

  // },[tokenURI])

  const onMint = () => {
    console.log('mintAddress', mintAddress);
    setMintLoading(true)
    writeNFT('address', mintAddress).then(res => {
      console.log('res', res);
      setMintLoading(false)
    }).catch(error => {
      console.error('onMint error', error);
      setMintLoading(false)
    })
  }

  return(
    <>
      <Box borderRadius='md'>
        <Flex>
          <Center w='200px' fontWeight="bold">NFT: </Center>
          <Center><Tag size="lg" colorScheme='green'>{nftSymbol}</Tag></Center>
        </Flex>
        <Flex mt="20px">
          <Center w='200px' fontWeight="bold">Minted: </Center>
          <Center><Tag size="lg" colorScheme='green'>{NFTBalance}</Tag></Center>
        </Flex>
        <Flex mt="20px">
          <Center w='200px' fontWeight="bold">Mint NFT: </Center>
          <Input w='320px' mr='16px' onChange={(e) => setMintAddress(e.target.value)}></Input>
          <Button isLoading={mintLoading} onClick={onMint}>Mint</Button>
        </Flex>
        <Flex>
        </Flex>
        {
          itemInfo
            ? <Box>
                <img src={`data:image/svg+xml;utf8,${itemInfo.svg}`} alt={itemInfo.name} width= '200px' />
                <Text fontSize='xl' px={2} py={2}>{itemInfo.name}</Text>
              </Box>
            : <Box />
          }
      </Box>
    </>
  )
}

export default ChainIndex