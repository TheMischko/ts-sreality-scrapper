import React from 'react'
import { Center, Spinner, Text, Stack } from '@chakra-ui/react';

/**
 * Basic spinner component that also tells user that the flats are loading.
 * @returns 
 */
export default function LoadingSpinner() {
  return (
    <Center h='100vh'>
      <Stack align='center'>
        <Spinner />
        <Text>Flats are loading...</Text>
      </Stack>
    </Center>
  )
}
