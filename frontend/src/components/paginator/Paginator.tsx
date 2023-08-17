import React, { useEffect, useState } from 'react'
import PaginatorButton from './atoms/PaginatorButton'
import { Stack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export interface PaginatorProps{
  maxPages:number,
  pageHookValue:number,
  pageHookSetter:Function,
}


/**
 * Checks if current window's width is smaller then 768px.
 * @returns 
 */
const getIsSmallSize = ():boolean => {
  return window.innerWidth < 768;
}


/**
 * Scrolls to the of the current page.
 */
const scrollUp = () => {
  window.scrollTo({top: 0, behavior: "smooth"})
}

/**
 * Components that allows to select various pages and update value of external hook.
 * 
 * @param props 
 * @returns 
 */
export default function Paginator({maxPages, pageHookValue, pageHookSetter}:PaginatorProps) {
  const [isSmallSize, setIsSmallSize] = useState<boolean>(false);

  /**
   * Switches `isSmallSize` state to true if there are too many pages or the window is too small.
   * @returns void
   */
  const changeIsSmallSize = () => {
    if(maxPages > 12){
      setIsSmallSize(true);
      return;
    }
    setIsSmallSize(getIsSmallSize());
  }

  // Add event handler for resizing of the browser window so the paginator can change its number of button accordingly.
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


  /**
   * Handler for click event on button that will change value of current page to a one smaller.
   * 
   * @param e event details
   */
  const onPrevClicked = (_:any) => {
    if(pageHookValue > 0){
      pageHookSetter(pageHookValue-1);
      scrollUp();
    }
  }


  /**
   * Handler for click event of numbered button that will change active page to its value.
   * 
   * @param e event details 
   * @param value value of the button (preferably the page this button belongs to)
   */
  const onPageClicked = (_:any, value?:number) => {
    if(value !== undefined && value >= 0 && value < maxPages){
      pageHookSetter(value);
      scrollUp();
    }
  }


  /**
   * Handler for click event on button that will change value of current page to a one bigger.
   * 
   * @param e event details
   */
  const onNextClicked = (_:any) => {
    if(pageHookValue < maxPages){
      pageHookSetter(pageHookValue+1);
      scrollUp();
    }
  }


  return (
    <Stack  direction='row'
            align='center'
            justifyContent='center'
            spacing={2}
            w='100%'
            h='50px'
            mt={10}
            mb={5}>
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
