import { useEffect, useState } from 'react'
import { Box } from "@chakra-ui/react";
import { useAccount, useReadContracts } from 'wagmi'
import { nftAddr } from '../helper/address'
import NFTAbi from '../abi/my-nft.json'

const wagmiContract = {
  abi: NFTAbi,
  address: nftAddr
}

const NFTList = () => {
  const [tokenIdList, setTokenIdList] = useState([])
  const { address: account } = useAccount()
  const { data: nftListObj = [] } = useReadContracts({
    contracts: [
      {
        ...wagmiContract,
        functionName: "getMyNFTList",
        args: [account]
      },
    ]
  })

  // useEffect(() => {
  //   console.log('nftList123', nftListObj);
    
  // }, [])
  const list = nftListObj[0]?.result || [];
  list.map(tokenURI => {
    console.log('tokenURI', tokenURI);
    return window.atob(tokenURI)
  })
  
  console.log('list', list);

  return(
    <Box border="1px solid red">
      <Box borderRadius='md'>
        123123 {account}
      </Box>
    </Box>
  )
}

export default NFTList