import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box,Center, Spacer, Flex } from '@chakra-ui/react'

const AccounHeader = () => {
  const { chainId } = useAccount()
  return <Box className='header' bg='tomato' w='100vw' p={4} color='#fff'>
    <Flex>
      <Center w="120px" fontWeight="bold" fontSize="18px">NFT Market</Center>
      <Spacer />
      <ConnectButton accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',}} 
      />  
    </Flex>
  </Box>
}

export default AccounHeader