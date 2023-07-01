// Phone Numbers

import Phones from './NBF4Phones.js'

import {useState, useEffect} from 'react'
const NBF4 = ({onNextClicked, onPrevClicked,onCreateClicked, setApplicantPhones, client, forInsured=false}) => {
    const [trigger, setTrigger] = useState(0) // https://timmousk.com/blog/react-call-function-in-child-component/
    
    useEffect(()=>{
        console.log('useEffect in NBF4.js')
        setTrigger(0)
    },[setTrigger])

    const previousClicked = (e) =>{
      e.preventDefault()
      onPrevClicked()
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log('Create pressed')
        setTrigger((trigger) => trigger + 1)
        //onNextClicked()
        //onCreateClicked()
        if (forInsured)
            onCreateClicked()
        else if(!forInsured)
            onNextClicked()
    }
    return (
    <div>
      <h2>New Business Form - Applicant Phone Contacts</h2>
      <Phones setApplicantPhones={setApplicantPhones} trigger = {trigger}  existingPhones = {client.phone_list}/>
      <form className="add-form" onSubmit={onSubmit}>
            <input type='submit' value='Prev' className='btn btn-block' onClick={previousClicked} />
            <input type='submit' value='Next' className='btn btn-block-3'/>
            
      </form>
    </div>
  )
}

export default NBF4

// Next Up: Insurnace Information
// Provider, plan type, ...etc