import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import SingleFlat from './atoms/singleFlat/SingleFlat'

type FlatsGridProps = {
  flats: Flat[]
}

export default function FlatsGrid(props:FlatsGridProps) {

  return (
    <Grid templateColumns={{base: '100%', md: 'repeat(3, 1fr)'}} 
          gap={{base: 3, lg: 10}}
          p={3}>
      {props.flats.map((flat:Flat) => {
        return (
        <GridItem h='100%' key={flat.image_url}>
          <SingleFlat {...flat}/>
        </GridItem>
        )
      })
      }
    </Grid>
  )
}
