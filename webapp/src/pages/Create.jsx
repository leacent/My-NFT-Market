import { ButtonGroup, FormControl, useToast, Button, Heading, FormLabel, Center, Input, FormErrorMessage, FormHelperText, Box, NumberInput, NumberInputField} from '@chakra-ui/react'
import { useState } from 'react'

export default function CreateNFT() {
  const toast = useToast()
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    maxSupply: '',
    mintPrice: ''
  })
  const onSetFormData = (key, value) => {
    value = (value || '').trim();
    setFormData({
      ...formData,
      [key]: value
    })
  }

  const onSubmit = () => {
    const isValid = Object.values(formData).every(item => !!item)
    if (!isValid) {
      toast({
        description: "Please complete the information",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    console.log('isValid', isValid);
    console.log('formData', formData);
  }
  return (
    <FormControl bg="#fff" padding="30px" mt="100px" borderRadius="10px" width="420px">
      <Heading as='h2' size='xl' mb="24px" textAlign="center" color="orange">
        Create My NFT
      </Heading>
      <FormLabel>Name</FormLabel>
      <NumberInput>
        <NumberInputField onChange={(e) => onSetFormData('name', e.target.value)} />
      </NumberInput>
      <FormLabel>Symbol</FormLabel>
      <NumberInput>
        <NumberInputField onChange={(e) => onSetFormData('symbol', e.target.value)} />
      </NumberInput>
      <FormLabel>Max Supply</FormLabel>
      <NumberInput>
        <NumberInputField onChange={(e) => onSetFormData('maxSupply', e.target.value)} />
      </NumberInput>
      <FormLabel>Mint Price</FormLabel>
      <NumberInput>
        <NumberInputField onChange={(e) => onSetFormData('mintPrice', e.target.value)} />
      </NumberInput>
      <Center mt="20px">
        <ButtonGroup variant='outline' spacing='6'>
          <Button colorScheme='blue' onClick={onSubmit}>Submit</Button>
        </ButtonGroup>
      </Center>
    </FormControl>
  )
}