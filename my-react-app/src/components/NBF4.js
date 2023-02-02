import Phones from './NBF4Phones.js'

import {useState, useEffect} from 'react'
const NBF4 = ({setApplicantContacts, client}) => {
    const [phones, setPhones] = useState({})
    const [emails, setEmails] = useState({})
    useEffect(()=>{
        console.log(client)
    })
    return (
    <div>
      <h2>New Business Form - Client Contacts</h2>
      <Phones setPhones = {setPhones} existingPhones = {client.phone_list}/>
    </div>
  )
}

export default NBF4