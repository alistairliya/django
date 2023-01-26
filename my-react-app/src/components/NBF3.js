
import {useState, useEffect} from 'react'

const NBF3 = ({client}) => {
  useEffect(()=>{
    console.log('NBF3')
    console.log(client)
  },[])
  return (
    <div>NBF3 {client.firstName}</div>
  )
}

export default NBF3