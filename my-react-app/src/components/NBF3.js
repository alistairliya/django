
import {useState, useEffect} from 'react'

const NBF3 = ({client}) => {
  const [address, setAddress] = useState({})
  
  useEffect(()=>{
    console.log('NBF3')
    console.log(client)
    if(client.clientId != null){
      console.log('Existing client. Look for address')
    }
  })

  

  return (
    // Create new address for new client.
    // Optional for existing client.
    <div>NBF3 {client.firstName}</div>
  )
}

export default NBF3