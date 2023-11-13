'use client'

type Props = {
  prop?:string
}

export function Button ({ prop }:Props) {
  return (
    <button 
      onClick={(e) => {console.log('click')}}
      // onPointerUp={(e) => {console.log('click')}}
      disabled={true}
    > 
      disable me 
    </button>
  )
}