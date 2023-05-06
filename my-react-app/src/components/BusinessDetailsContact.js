
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {useEffect, useState} from "react"
import { useAuth } from "../hooks/useAuth"
// address and phone are urls
const BusinessDetailsContact = ({address, phone}) => {
    const { user } = useAuth()
    const [myAddress, setMyAddress] = useState(null)
    const [myPhone, setMyPhone] = useState(null)

    useEffect(()=>{
        console.log('BusinessDetailsContact useEffect()')
        console.log(address)
        console.log(phone)

        const getAddress = async () => {
            console.log('inside getAddress')
            let a = await fetchObject(address)
            console.log("got address!")
            console.log(a)
            a.province_state = await fetchObject(a.province_state)
            a.country = await fetchObject(a.country)
            console.log(a)
            return a
        }
        const getPhone = async () => {
            console.log('inside getPhone')
            let p = await fetchObject(phone)
            console.log("got phone!")
            console.log(p)
            return p
        }

        if(myAddress == null){
            getAddress().then((a)=>{
                console.log('setting MyAddress')
                setMyAddress(a)
                console.log(a)
                console.log('after set MyAddress')
            })
        }
        if(myPhone == null){
            getPhone().then((p)=>{
                console.log('setting MyPhone')
                setMyPhone(p)
                console.log(p)
                console.log('after set MyPhone')
            })
        }
        

    }, [address, phone, myAddress, myPhone])

    const fetchObject = async (url) =>{
        let headers = new Headers()
        const token = user['token']
        const auth_str = 'Token '+token
        headers.set('Authorization', auth_str)
        const res = await fetch(url,{headers:headers})
        const data = await res.json()
        return data
    }

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
            label="Street Address" 
            variant="standard" 
            value={myAddress ? myAddress.street_address : ''}
          /> 
          <TextField 
            id="standard-basic" 
            label="Unit" 
            variant="standard" 
            value={myAddress ? (myAddress.unit?myAddress.unit:"") : ''}
          /> 
          <TextField 
            id="standard-basic" 
            label="City" 
            variant="standard" 
            value={myAddress ? myAddress.city : ''}
          /> 
          <TextField 
            id="standard-basic" 
            label="Province/State" 
            variant="standard" 
            value={myAddress ? myAddress.province_state.province_state_name : ''}
          /> 
        </div>
          <TextField 
            id="standard-basic" 
            label="Country" 
            variant="standard" 
            value={myAddress ? myAddress.country.country_name : ''}
          /> 
        <div>
          <TextField 
            id="standard-basic" 
            label="Area Code" 
            variant="standard" 
            value={myPhone ? myPhone.area_code : ''}
          /> 
          <TextField 
            id="standard-basic" 
            label="Phone Number" 
            variant="standard" 
            value={myPhone? myPhone.phone_number : ''}
          /> 
        </div>
        </Box>

    </div>
  )
}

export default BusinessDetailsContact