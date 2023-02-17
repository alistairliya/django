import Phones from './NBF4Phones.js'

import {useState, useEffect} from 'react'
const NBF4 = ({setApplicantContacts, client}) => {
    const [phones, setPhones] = useState({})
    const [emails, setEmails] = useState({})
    const [phonesElement, setPhonesElement] = useState([<Phones setPhones = {setPhones} existingPhones = {client.phone_list}/>])

    useEffect(()=>{
        console.log(client)
    },[])

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log('Next pressed')
        console.log(phonesElement[0]['phoneElementList'])
    }

    return (
    <div>
      <h2>New Business Form - Client Phone Contacts</h2>
      <div>
        {phonesElement[0]}      
      </div>

      <form className="add-form" onSubmit={onSubmit}>
            <input type='submit' value='Next' className='btn btn-block' />
      </form>
    </div>
  )
}

export default NBF4