import Clients from './Clients'
import NewClient from './NewClient'

import {useState, useEffect} from 'react'
import { useAuth } from "../hooks/useAuth"
const NBF2 = ({client,setClient, onNextClicked}) => {
    const [clients, setClients] = useState([])

    const { user } = useAuth()
    useEffect(()=>{
        console.log('NBF2')
        console.log(client)
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
        <h2>New Business Form - Client Information</h2>
    {
      clients.length > 0?
        (<Clients clients={clients} client={client} setClient={setClient} onNextClicked={onNextClicked}/>):
        (<NewClient client={client} setClient={setClient} onNextClicked={onNextClicked}></NewClient>)
    }
    </div>
  )
}

export default NBF2