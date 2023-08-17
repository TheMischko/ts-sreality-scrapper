import React, { useEffect, useState } from 'react'
import PaginatorButton from './atoms/PaginatorButton'
import { Stack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export interface PaginatorProps{
  maxPages:number,
  pageHookValue:number,
  pageHookSetter:Function,
}

const getIsSmallSize = ():boolean => {
  return window.innerWidth < 768;
}

export default function Paginator({maxPages, pageHookValue, pageHookSetter}:PaginatorProps) {
  const [isSmallSize, setIsSmallSize] = useState<boolean>(false);

  const changeIsSmallSize = () => {
    if(maxPages > 12){
      setIsSmallSize(true);
      return;
    }
    setIsSmallSize(getIsSmallSize());
  }

  useEffect(() => {
    changeIsSmallSize();

    window.addEventListener('resize', changeIsSmallSize)

    return () => {
      window.removeEventListener('resize', changeIsSmallSize)
    }
  })


  /** Contains number that are to be shown as buttons in paginator */
  let iters = Array.from(Array(maxPages).keys());
  if(isSmallSize){
    // Reduce array to just the neighbours of the currently selected page
    let startIndex = pageHookValue-2;
    if(startIndex < 0) startIndex = 0;

    let endIndex = pageHookValue+3;
    if(endIndex > maxPages) endIndex = maxPages;

    iters = iters.slice(startIndex, endIndex)
  }


  const onPrevClicked = (_:any) => {
    if(pageHookValue > 0){
      pageHookSetter(pageHookValue-1);
    }
  }


  const onPageClicked = (_:any, value?:number) => {
    if(value && value > 0 && value < maxPages){
      pageHookSetter(value);
    }
  }


  const onNextClicked = (_:any) => {
    if(pageHookValue < maxPages){
      pageHookSetter(pageHookValue+1);
    }
  }


  return (
    <Stack  direction='row'
            align='center'
            justifyContent='center'
            spacing={2}
            w='100%'
            h='50px'>
      {pageHookValue > 0
        ? <PaginatorButton key="prev" onClickHandler={onPrevClicked} active={false}><ArrowBackIcon /></PaginatorButton>
        : null
      }
      {iters.map((i) => (
        <PaginatorButton key={i} value={i} onClickHandler={onPageClicked} active={i===pageHookValue}>{(i+1).toFixed(0)}</PaginatorButton>
      ))}
      {pageHookValue < maxPages-1
        ? <PaginatorButton key="next" onClickHandler={onNextClicked} active={false}><ArrowForwardIcon/></PaginatorButton>
        : null
      }
    </Stack>
  )
}
