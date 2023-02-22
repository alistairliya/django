import Phones from './NBF4Phones.js'

import {useState, useEffect} from 'react'
const NBF4 = ({setApplicantContacts, client}) => {
    const [applicationPhones, setApplicationPhones] = useState([])
    const [trigger, setTrigger] = useState(0)
    //const [phonesElement, setPhonesElement] = useState([<Phones applicationPhones = {applicationPhones} setApplicationPhones = {setApplicationPhones} existingPhones = {client.phone_list}/>])
    //const [phonesElement, setPhonesElement] = useState([])    

    const addApplicationPhone = (phone) =>{
        console.log('addApplicationPhones...')
        console.log(applicationPhones)
        console.log(phone)
        setApplicationPhones(old => [...old, phone])
        console.log(applicationPhones)
    }

    //const [phonesElement, setPhonesElement] = useState([<Phones trigger = {trigger} addApplicationPhone={addApplicationPhone}   existingPhones = {client.phone_list}/>])
    
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
        setTrigger((trigger) => trigger + 1)
        console.log(trigger)
    }
/*
      <div>
        {phonesElement[0]}      
      </div>
*/
    return (
    <div>
      <h2>New Business Form - Client Phone Contacts</h2>
      <Phones trigger = {trigger} addApplicationPhone={addApplicationPhone}   existingPhones = {client.phone_list}/>
      <form className="add-form" onSubmit={onSubmit}>
            <input type='submit' value='Next' className='btn btn-block' />
      </form>
    </div>
  )
}

export default NBF4