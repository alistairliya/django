
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
    const [myMiddleName , setMyMiddleName] = useState('Middle')
    const [myBirthDate , setMyBirthDate] = useState('Birth Date')
    const [myGender, setMyGender] = useState('')
    const [mySIN, setMySIN] = useState('')
    useEffect(()=>{
        //console.log('#######################################')
        //console.log('### BusinessDetailsClient useEffect ###')
        console.log(client)
        setMyClient(client)
        if(client){
          setMyLastName(client.last_name)
          setMyFirstName(client.first_name)
          setMyMiddleName(client.middle_name)
          setMyBirthDate(client.birthdate)
          if(client.gender)
            setMyGender(client.gender)
          setMySIN(client.sin)
        }
        //console.log("^^^ BusinessDetailsClient useEffect")
        //console.log('#######################################')
    },[myLastName, myClient, client])
    // https://mui.com/material-ui/react-text-field/
    return (
    <div className="container">
        <h2>Applicant Information</h2>   
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 
        <div>        
          <TextField 
            id="standard-basic" 
            label="First Name" 
            variant="standard" 
            value={myFirstName}
          /> 
          <TextField 
            id="standard-basic" 
            label="Middle Name" 
            variant="standard" 
            value={myMiddleName}
          /> 
          <TextField 
            id="standard-basic" 
            label="Last Name" 
            variant="standard" 
            value={myLastName}
          /> 
        </div>
        <div>
          <TextField 
            id="standard-basic" 
            label="Birth Date" 
            variant="standard" 
            value={myBirthDate}
          /> 
        </div>
        <div>
          <TextField 
            id="standard-basic" 
            label="SIN" 
            variant="standard" 
            value={mySIN}
          /> 
        </div>
        <div>
          <TextField 
            id="standard-basic" 
            label="Gender" 
            variant="standard" 
            value={myGender}
          /> 

        </div>
        </Box>

    </div>
  )
}

export default BusinessDetailsClient