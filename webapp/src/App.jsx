import { Box } from '@chakra-ui/react'

import './App.css'
import ChainIndex from './index'

function App() {
  return (
    <>
      <Box bg='tomato' w='100vw' p={4} color='white'>
        My Dapp
      </Box>
      <ChainIndex></ChainIndex>
    </>
  )
}

export default App
