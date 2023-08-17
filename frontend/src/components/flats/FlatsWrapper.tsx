import React, { useEffect, useState } from 'react'

import LoadingSpinner from './atoms/spinner/LoadingSpinner';

import flatsModel from '../../model/flatsModel';
import FlatsGrid from './FlatsGrid';
import Paginator from '../paginator/Paginator';
import { Stack } from '@chakra-ui/react';

const FLATS_ON_PAGE = 45;

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
  const pages = Math.ceil(flats.length / FLATS_ON_PAGE);
  const flatsStartIndex = FLATS_ON_PAGE * activePage;
  const flatsEndIndex = flatsStartIndex + FLATS_ON_PAGE;
  const flatsToShow = loading ? [] : flats.slice(flatsStartIndex, flatsEndIndex);


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
            <FlatsGrid flats={flatsToShow}/>
            <Paginator maxPages={pages} pageHookValue={activePage} pageHookSetter={setActivePage}/>
          </Stack>
        )
       }
    </div>
  )
}
