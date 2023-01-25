import Clients from './Clients'

import {useState, useEffect} from 'react'
import Button from "@mui/material/Button"
import { useAuth } from "../hooks/useAuth"
const NBF2 = ({client,onNextClicked, index}) => {
    const [clients, setClients] = useState([])
    const [nextButtonEnabled, setNextButtonEnabled] = useState(true)

    const { user } = useAuth()
    useEffect(()=>{
        console.log('Use Effect called')
        const getClients = async() =>{
            console.log(client)
            const possibleClients = await fetchClient(client.firstName, client.lastName)
            console.log(possibleClients)
            setClients(possibleClients)
        }
        getClients()
    },[])

    const fetchClient = async(first_name, last_name) =>{
        let headers = new Headers()
        const token = user['token']
        console.log('First: '+first_name)
        const auth_str = 'Token '+token
        console.log(auth_str)
        headers.set('Authorization', auth_str)
        let url = 'http://localhost:8000/api/clients/'
        if(first_name!==''){
            url = url + '?first_name='+first_name
        } 
        if(last_name!==''){
            if(first_name===''){
              url = url+'?'
            }else{
              url=url+"&"
            }
            url = url + 'last_name='+last_name
        }
        console.log(url)
        const res = await fetch(url,{headers:headers})
        const data = await res.json()
        return data
    }


  return (
    <div>
    {clients.length > 0?(<div><Clients clients={clients}/>
    <Button disabled={nextButtonEnabled}>Use selected client</Button></div>):('')}
    NBF2...{client.lastName} {client.firstName} ABC
    </div>
  )
}

export default NBF2