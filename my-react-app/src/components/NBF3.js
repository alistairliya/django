
import {useState, useEffect} from 'react'

const NBF3 = ({client}) => {
  const [address, setAddress] = useState({})
  const [existingAddresses, setExistingAddresses] = useState(client.client_addresses)
  
  useEffect(()=>{
    console.log('NBF3')
    console.log(client)
    //if(client.client_addresses != null && client.client_addresses.length>0){
    if(existingAddresses && existingAddresses.length > 0){
      console.log('Existing client with existing addresses:')
      console.log(existingAddresses)
    }
  })

  //const fetchAddress =  

  return (
    // Create new address for new client.
    // Optional for existing client.
    <div>NBF3 {client.firstName}</div>
  )
}

export default NBF3