import Phones from './NBF4Phones.js'

import {useState, useEffect} from 'react'
const NBF4 = ({onNextClicked, setApplicantPhones, client}) => {
    const [trigger, setTrigger] = useState(0) // https://timmousk.com/blog/react-call-function-in-child-component/
    
    useEffect(()=>{
        console.log('useEffect in NBF4.js')
        setTrigger(0)
    },[setTrigger])

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log('Next pressed')
        setTrigger((trigger) => trigger + 1)
        onNextClicked()
    }
    return (
    <div>
      <h2>New Business Form - Client Phone Contacts</h2>
      <Phones setApplicantPhones={setApplicantPhones} trigger = {trigger}  existingPhones = {client.phone_list}/>
      <form className="add-form" onSubmit={onSubmit}>
            <input type='submit' value='Next' className='btn btn-block' />
      </form>
    </div>
  )
}

export default NBF4