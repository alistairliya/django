import Phone from './Phone'
import Email from './Email'

import {useState, useEffect} from 'react'
const NBF4 = ({setApplicantContacts, client}) => {
    const [phone, setPhone] = useState({})
    const [email, setEmail] = useState({})
    useEffect(()=>{
        console.log(client)
    })
    return (
    <div>
      <h2>New Business Form - Client Contacts</h2>
      <Phone setPhone = {setPhone} existingPhone = {client.phone_list}/>
      <Email setEmail = {setEmail}/>
    </div>
  )
}

export default NBF4