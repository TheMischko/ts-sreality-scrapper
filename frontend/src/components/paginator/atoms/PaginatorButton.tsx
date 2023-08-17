import { Button } from '@chakra-ui/react'
import React from 'react'

export interface PaginatorButtonProps {
  value?: number,
  active: boolean,
  children: JSX.Element|string,
  onClickHandler(e:React.MouseEvent, value?: number):void
}

/**
 * Generic button of the Paginator component.
 * `value` should correspond to the page this button may represent in the paginator.
 * 
 * @param props 
 * @returns 
 */
export default function PaginatorButton({active, children, onClickHandler, value}:PaginatorButtonProps) {
  return (
    <Button borderRadius="100%" 
            w={{base:"40px", md:"50px"}} 
            h={{base:"40px", md:"50px"}} 
            colorScheme={active ? 'teal' : 'gray'}
            css={{md: {
              '&:hover': {color: 'teal'}
            }}}
            onClick={(event) => onClickHandler(event, value)}>
              {children}
    </Button>
  )
}
