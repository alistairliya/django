
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
    const [myLastName , setMyLastName] = useState('Last')
    const [myFirstName , setMyFirstName] = useState('First')
    useEffect(()=>{
        //console.log('#######################################')
        //console.log('### BusinessDetailsClient useEffect ###')
        //console.log(client)
        setMyClient(client)
        if(client){
          setMyLastName(client.last_name)
          setMyFirstName(client.first_name)
        }
        //console.log("^^^ BusinessDetailsClient useEffect")
        //console.log('#######################################')
    },[myLastName, myClient, client])
    // https://mui.com/material-ui/react-text-field/
    return (
    <div className="container">
        <h2>Client Information</h2>    
        <div>        
          <TextField 
            id="standard-basic" 
            label="Last Name" 
            variant="standard" 
            value={myLastName}
          /> 
          <TextField 
            id="standard-basic" 
            label="First Name" 
            variant="standard" 
            value={myFirstName}
          /> 
        </div>

    </div>
  )
}

export default BusinessDetailsClient