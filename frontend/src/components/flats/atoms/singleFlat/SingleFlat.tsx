import { Card, CardBody, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export default function SingleFlat(flat:Flat) {
  return (
    <Card h="100%" 
          m={{base: 0, lg: 4}} 
          css={{
            '&:hover': {
              background: 'rgba(0,0,0,0.1)'
            }
          }}>
      <CardBody>
        <Stack  align='center'
                direction={{base: 'row', md: 'column'}}>
          <Image  src={flat.image_url}
                  borderRadius={{base: 'md', md: 'lg'}}
                  height={{base: '150', sm: '200', md: 'auto'}}
                  pr={{base: '2', md: '0'}}/>
          <Stack mt='4' spacing='1'>
            <Text fontSize={{base: 'l', sm: 'xl'}}>{flat.title}</Text>
            <Text fontSize={{base: 'sm', sm: 'l'}} color='blackAlpha.600'>{flat.address}</Text>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  )
}
