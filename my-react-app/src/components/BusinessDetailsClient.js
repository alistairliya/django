
// First Name
// Middle Name
// Last Name
// Birth Date
// Gender
// SIN
// Edit Button

import {useEffect, useState} from "react"
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const BusinessDetailsClient = ({client}) => {
    const [editMode, setEditMode] = useState(false)
    const [myClient, setMyClient] = useState({})
    const [myLastName , setMyLastName] = useState('bob')
    useEffect(()=>{
        console.log('BusinessDetailsClient useEffect')
        console.log(client)
        //setMyClient(client)
        //setMyLastName(client.last_name)
    },[myLastName, myClient])
    // https://mui.com/material-ui/react-text-field/
    return (
    <div className="container">
        <h1>{myLastName}</h1>
        <h2>Client Information</h2>    
        <div>        
          <TextField 
            id="standard-basic" 
            label="Last Name" 
            variant="standard" 
            value={myLastName}
          /> 
        </div>

    </div>
  )
}

export default BusinessDetailsClient