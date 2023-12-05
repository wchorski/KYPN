import React, { CSSProperties, ReactNode } from 'react'

export function FlexList({children}:{children:ReactNode|ReactNode[]}) {

  const styles = {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    justifyContent: 'center',
  } as CSSProperties

  return (
    <ul>
      {children}
    </ul>
  )
}
