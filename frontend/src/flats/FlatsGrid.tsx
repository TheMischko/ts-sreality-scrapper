import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import SingleFlat from './atoms/singleFlat/SingleFlat'

type FlatsGridProps = {
  flats: Flat[]
}

export default function FlatsGrid(props:FlatsGridProps) {

  return (
    <Grid templateColumns={{base: '100%', md: 'repeat(3, 1fr)'}} 
          templateRows={{base: `repeat(${props.flats.length}, 1fr)`, md: `repeat(${props.flats.length % 3}, 1fr)`}}
          gap={3}
          p={3}>
      {props.flats.map((flat:Flat) => {
        return (
        <GridItem>
          <SingleFlat {...flat}/>
        </GridItem>
        )
      })
      }
    </Grid>
  )
}
