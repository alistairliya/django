import {useState} from 'react'

const NewClient = ({client, onNextClicked, setClient, disabled}) => {

  const [lastName, setLastName] = useState(client.lastName)
  const [firstName, setFirstName] = useState(client.firstName)
  const [middleName, setMiddleName] = useState('')
  const [birthDate, setBirthDate] = useState('')



  const onSubmit = (e) =>{
      e.preventDefault() // avoiding submitting to a page.
      
      setClient({lastName:lastName, firstName:firstName})
      onNextClicked()

      //onAdd({lastName, firstName})
      //setLastName('')
      //setFirstName('')
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <h2>New Business Form - Client Information</h2>
        <div className="form-control">
            <label>Last Name</label>
            <input type='text' placeholder="Client's Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Middle Name</label>
            <input type='text' placeholder="Client's Middle Name" value={middleName} onChange={(e)=>setMiddleName(e.target.value)} />
        </div>
        <div className="form-control">
            <label>First Name</label>
            <input type='text' placeholder="Client's First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Birth Date</label>
            <input type='date'  value={birthDate} onChange={(e)=>setBirthDate(e.target.value)} />
        </div>
        <input type='submit' value='Next' className='btn btn-block' />
    </form>
  )
}

export default NewClient