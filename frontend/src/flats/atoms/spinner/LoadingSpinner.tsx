import React from 'react'
import { Center, Spinner, Text, Stack } from '@chakra-ui/react';

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
