// import { useAccount } from 'wagmi'
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Center, Spacer, Flex } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useAccount } from '@particle-network/connectkit';
import { useEffect, useState } from 'react';

const AccounHeader = () => {
  const [name, setName] = useState('leacent')
  
  // const account = useAccount()
  const onHandleName = () => {
    console.log('name', name);
    setName('song')
    console.log('name', name);
  }
  console.log('12312');
  useEffect(() => {
    console.log('变更后', name);
  }, [name])
  
  return <Box className='header' bg='tomato' w='100vw' p={4} color='#fff'>
    <div onClick={onHandleName}>Set Name</div>
    <div>My Name: {name}</div>
    <Flex>
      {
        // <Center w="120px" fontWeight="bold" fontSize="18px">NFT Market</Center>
      }
      <Center fontWeight="bold" fontSize="16px">
        <Link to="/create">Create</Link>
      </Center>
      <Spacer />
      
    </Flex>
  </Box>
}

export default AccounHeader