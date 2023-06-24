import {useState, useEffect} from 'react'
import Select from 'react-select' // https://react-select.com/home
import Button from './Button'

const NewClient = ({client, onNextClicked, onPrevClicked, setClient, disabled}) => {

  const [lastName, setLastName] = useState(client.lastName)
  const [firstName, setFirstName] = useState(client.firstName)
  const [middleName, setMiddleName] = useState('')
  const [birthDate, setBirthDate] = useState("2000-01-01")
  const [sin, setSin] = useState('')
  const [gender, setGender] = useState()

  useEffect(()=>{
    console.log('NewClient.js')
    console.log('NewClinet onNextClicked:')
    console.log(onNextClicked)
    console.log(client)
    //console.log(onNextClicked)
    //console.log(setClient)
  })

  const onSubmit = (e) =>{
      e.preventDefault() // avoiding submitting to a page.
      setClient({last_name:lastName, first_name:firstName, middle_name:middleName, gender:gender, sin:sin, birthdate:birthDate, is_new_client:true})
      onNextClicked()
  }

  const previousClicked = (e) =>{
    e.preventDefault()
    onPrevClicked()
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
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
        <div className="form-control">
            <label>Social Insurance Number</label>
            <input type='text'  value={sin} onChange={(e)=>setSin(e.target.value)} />
        </div>
        <div className="form-control">
        <label>Gender</label>
          <Select options={[{value:'M',label:'Male'},{value:'F', label:'Female'}]} onChange={(e)=>{setGender(e.value)}} />
        </div>
        <input type='submit' value='Prev' className='btn btn-block' onClick={previousClicked} />
        <input type='submit' value='Next' className='btn btn-block-2' />
    </form>
  )
}

export default NewClient