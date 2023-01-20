import { useState } from 'react'

const NBF1 = (onAdd) => {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [address, setAddress] = useState('')
    const [submitted, setSumbmitted] = useState(false)

    const onSubmit = (e) =>{
        e.preventDefault() // avoiding submitting to a page.
        // some validation
        if(!lastName){
            alert('Please add Last Name')
            return
        }

        onAdd({lastName, firstName, address, submitted})
        setLastName('')
        setFirstName('')
        setAddress('')
        setSumbmitted(false)


    }

    return (
    <form className="add-form" onSubmit={onSubmit}>
        <h2>New Business Form - Client Information</h2>
        <div className="form-control">
            <label>Last Name</label>
            <input type='text' placeholder="Client's Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        </div>
        <div className="form-control">
            <label>First Name</label>
            <input type='text' placeholder="Client's First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        </div>
        <input type='submit' value='Next' className='btn btn-block' />
    </form>
  )
}

export default NBF1