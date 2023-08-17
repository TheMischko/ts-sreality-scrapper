import React, { useEffect, useState } from 'react'

import LoadingSpinner from './atoms/spinner/LoadingSpinner';

import flatsModel from '../model/flatsModel';
import FlatsGrid from './FlatsGrid';

export default function FlatsWrapper() {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true)

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
          <FlatsGrid flats={flats}/>
        )
       }
    </div>
  )
}
