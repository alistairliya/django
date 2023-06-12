
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
    const [myFirstName , setMyFirstName] = useState(client?client.first_name:'First')
    const [myMiddleName , setMyMiddleName] = useState('Middle')
    const [myBirthDate , setMyBirthDate] = useState('Birth Date')
    const [myGender, setMyGender] = useState('')
    const [mySIN, setMySIN] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('white');
    useEffect(()=>{
        //console.log('#######################################')
        console.log('### BusinessDetailsClient useEffect ###')
        console.log(client)
        setMyClient(client)
        if(client && !editMode){
          setMyLastName(client.last_name)
          setMyFirstName(client.first_name)
          setMyMiddleName(client.middle_name)
          setMyBirthDate(client.birthdate)
          if(client.gender)
            setMyGender(client.gender)
          setMySIN(client.sin)
        }
        if(editMode){
          console.log('EDIT MODE')
          setBackgroundColor('lightblue')
        }
        //console.log("^^^ BusinessDetailsClient useEffect")
        //console.log('#######################################')
    },[myLastName, myClient, client, editMode])


    const handleChange = (event) => {
      setEditMode(true)
      const { name, value } = event.target
      console.log('handleChange')
      console.log(event.target.value)
      console.log(name)
      /*
      if(name === 'myFirstName'){
        console.log('set MyFirstName')
        setMyFirstName(event.target.value);
      }*/

      switch(name){
        case 'myFirstName':
          setMyFirstName(value)
          break
        case 'myMiddleName':
          setMyMiddleName(value)
          break
        case 'myLastName':
          setMyLastName(value)
          break
        case 'myBirthDate':
          setMyBirthDate(value)
          break
        case 'mySIN':
          setMySIN(value)
          break
        case 'myGender':
          setMyGender(value)
          break
        default:
          console.log('default')
      }
    }
    // https://mui.com/material-ui/react-text-field/
    return (
    <div className="container" style={{backgroundColor}}>
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
            name="myFirstName"
            onChange={handleChange}
          /> 
          <TextField 
            id="standard-basic" 
            label="Middle Name" 
            variant="standard" 
            value={myMiddleName}
            name="myMiddleName"
            onChange={handleChange}
          /> 
          <TextField 
            id="standard-basic" 
            label="Last Name" 
            variant="standard" 
            value={myLastName}
            name="myLastName"
            onChange={handleChange}
          /> 
        </div>
        <div>
          <TextField 
            id="standard-basic" 
            label="Birth Date" 
            variant="standard" 
            value={myBirthDate}
            name="myBirthDate"
            onChange={handleChange}
          /> 
        </div>
        <div>
          <TextField 
            id="standard-basic" 
            label="SIN" 
            variant="standard" 
            value={mySIN}
            name="mySIN"
            onChange={handleChange}
          /> 
        </div>
        <div>
          <TextField 
            id="standard-basic" 
            label="Gender" 
            variant="standard" 
            value={myGender}
            name="myGender"
            onChange={handleChange}
          /> 

        </div>
        </Box>

    </div>
  )
}

export default BusinessDetailsClient