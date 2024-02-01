
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Spacer, Flex, Center } from '@chakra-ui/react'

const AccounHeader = () => {
  return <Box bg='tomato' w='100vw' p={4} color='white'>
    <Flex>
      <Center  w="100px" fontWeight="bold" fontSize="22px">My Dapp</Center>
      <Spacer />
      <ConnectButton accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',}} 
      />  
    </Flex>
  </Box>
}

export default AccounHeader