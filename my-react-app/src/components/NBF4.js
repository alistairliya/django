import Phones from './NBF4Phones.js'

import {useState, useEffect} from 'react'
const NBF4 = ({setApplicantContacts, client}) => {
    const [applicationPhones, setApplicationPhones] = useState([])
    
    //const [phonesElement, setPhonesElement] = useState([<Phones applicationPhones = {applicationPhones} setApplicationPhones = {setApplicationPhones} existingPhones = {client.phone_list}/>])
    //const [phonesElement, setPhonesElement] = useState([])    

    const addApplicationPhone = (phone) =>{
        console.log('addApplicationPhones...')
        console.log(applicationPhones)
        console.log(phone)
        setApplicationPhones(old => [...old, phone])
        console.log(applicationPhones)
    }

    const [phonesElement, setPhonesElement] = useState([<Phones addApplicationPhone={addApplicationPhone}   existingPhones = {client.phone_list}/>])
    
    useEffect(()=>{
        console.log('useEffect in NBF4.js')
        console.log(applicationPhones)
        //setPhonesElement([<Phones addApplicationPhone={addApplicationPhone}   existingPhones = {client.phone_list}/>])
    })

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log('Next pressed')
        //console.log(phonesElement[0]['phoneElementList'])
        console.log(applicationPhones)
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