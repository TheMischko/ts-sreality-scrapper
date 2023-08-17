import React, { useEffect, useState } from 'react'

import LoadingSpinner from './atoms/spinner/LoadingSpinner';

import flatsModel from '../../model/flatsModel';
import FlatsGrid from './FlatsGrid';
import Paginator from '../paginator/Paginator';
import { Stack } from '@chakra-ui/react';

export default function FlatsWrapper() {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try{
      const fetchedFlats = await flatsModel.getFlats();
      setFlats(fetchedFlats);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }


  return (
    <div>
      {loading 
        // Loading
        ?(
          <LoadingSpinner />
        )
        // Loaded
        :(
          <Stack>
            <FlatsGrid flats={flats}/>
            <Paginator maxPages={true ? 10 :Math.ceil(flats.length/9)} pageHookValue={activePage} pageHookSetter={setActivePage}/>
          </Stack>
        )
       }
    </div>
  )
}
