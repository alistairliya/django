// 1. A submit button to save the data
import { useEffect, useState } from "react"

const NBF10 = ({data}) => {

    const [clientId, setClientId] = useState()
    const [addressId, setAddressId] = useState()

    useEffect(()=>{
        console.log('NBF10 useEffect')
        console.log(data)
        if(clientId){
            console.log('NBF10 Client ID is set: '+clientId)
        }
    },[data, clientId])

    // New or existing client? Need to add only if new.
    // If exisitng client, get the ID and URL
    // If new client, create the client, and get ID and URL
    const processClient = () => {
        console.log('NBF10 Create Client')
        if(data['client'].is_new_client != null){
            console.log('NBF10 Client is new')
            // To be implemented.
            // POST new client
            // Example:
            // curl -X POST -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' -H 'Content-Type: application/json'  -d  '{"first_name":"A", "last_name":"Americano","birthdate":"1999-12-09","sin":"123456789","created_date":"2023-04-02T00:00","modified_date":"2023-04-01T00:00", "created_by":"http://127.0.0.1:8000/api/users/9/","gender":"M"}' http://127.0.0.1:8000/api/clients/   

        }else{
            console.log('NBF10 Client is not new')
            setClientId(data.client.id)
        } 
    }

    const processAddress = () => {
        console.log('NBF10 Process Address')
        if(data['address'].is_new_address != null){
            console.log('NBF10 Address is new')
        }else{
            console.log('NBF10 Address is not new')
            setAddressId(data.address.id)
        }
    }

    const processPhone = () => {
        console.log('NBF10 Process Phone')
        // can prob. skip this
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        // take data and save to DB
        console.log('NBF10 Submit pressed')
        processClient()
    }
    return (
    <div>{JSON.stringify(data, null, 4)}
    
      <form className="add-form" onSubmit={onSubmit}>
            <input type='submit' value='Submit' className='btn btn-block' />
      </form>
    </div>
  )
}

export default NBF10