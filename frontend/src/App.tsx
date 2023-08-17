import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import FlatsWrapper from './components/flats/FlatsWrapper';

function App() {
  return (
  <ChakraProvider>
    <FlatsWrapper />
  </ChakraProvider>
  );
}

export default App;
