import Phones from './NBF4Phones.js'

import {useState, useEffect} from 'react'
const NBF4 = ({setApplicantContacts, client}) => {
    const [phones, setPhones] = useState({})
    const [emails, setEmails] = useState({})
    useEffect(()=>{
        console.log(client)
    })
    const onSubmit = (e) =>{
        e.preventDefault()
        console.log('Next pressed')
    }

    return (
    <div>
      <h2>New Business Form - Client Phone Contacts</h2>
      <div>      
      <Phones setPhones = {setPhones} existingPhones = {client.phone_list}/>
      </div>

      <form className="add-form" onSubmit={onSubmit}>
            <input type='submit' value='Next' className='btn btn-block' />
      </form>
    </div>
  )
}

export default NBF4