
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {useEffect, useState} from "react"

const BusinessDetailsContact = ({address, phone}) => {

    useEffect(()=>{
        console.log('BusinessDetailsContact useEffect()')
        console.log(address)
        console.log(phone)
    }, [address, phone])

    return (
    <div className="container">
        <h2>Application Contact</h2>
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
            value={'TEST'}
          /> 
          <TextField 
            id="standard-basic" 
            label="Middle Name" 
            variant="standard" 
            value={'TEST'}
          /> 
          <TextField 
            id="standard-basic" 
            label="Last Name" 
            variant="standard" 
            value={'test'}
          /> 
        </div>
        <div>
          <TextField 
            id="standard-basic" 
            label="Birth Date" 
            variant="standard" 
            value={'test'}
          /> 
        </div>
        <div>
          <TextField 
            id="standard-basic" 
            label="SIN" 
            variant="standard" 
            value={'test'}
          /> 
        </div>
        <div>
          <TextField 
            id="standard-basic" 
            label="Gender" 
            variant="standard" 
            value={'test'}
          /> 

        </div>
        </Box>

    </div>
  )
}

export default BusinessDetailsContact