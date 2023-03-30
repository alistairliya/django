// Modeled AddTask example, 1:03:25
import NBF1 from './NBF1'
import NBF2 from './NBF2'
import NBF3 from './NBF3'
import NBF4 from './NBF4'
import NBF5 from './NBF5'
import NBF6 from './NBF6'
import NBF7 from './NBF7'
import NBF8 from './NBF8'
import NBF9 from './NBF9'

import { useState, useEffect} from 'react'
//import { useRadioGroup } from '@mui/material'
const NewBusiness = ({onAdd}) => {
    const [client, setClient] = useState()
    const [index, setIndex] = useState(0)
    const [applicantAddress, setApplicantAddress] = useState()
    const [applicantPhones, setApplicantPhones] = useState()
    const [applicantInsurance, setApplicantInsurance] = useState()
    const [medicals, setMedicals] = useState()
    const [documents, setDocuments] = useState()
    const [collaborators, setCollaborators] = useState()
    const [complianceEntities, setComplianceEntities] = useState()

    const onNextClicked = () => {
        console.log("Clicked Next from index "+index)
        setIndex(index+1)
        console.log(medicals)
    }

    useEffect(()=>{
        console.log('useEffect in NewBusiness.js')
        //console.log(applicantPhones)
        //console.log(applicantAddress)
        //console.log(applicantInsurance)
    })

    const nbfs = [
        <NBF1 setClient={setClient} onNextClicked = {onNextClicked}/>, 
        <NBF2 setClient={setClient} onNextClicked = {onNextClicked} client={client}  />,
        <NBF3 setApplicantAddress= {setApplicantAddress} onNextClicked = {onNextClicked} client={client}/>,
        <NBF4 onNextClicked = {onNextClicked} setApplicantPhones = {setApplicantPhones} client = {client} />,
        <NBF5 onNextClicked = {onNextClicked} setInsuranceInfo={setApplicantInsurance}/>,
        <NBF6 onNextClicked={onNextClicked} setMedicals= {setMedicals}/>,
        <NBF7 onNextClicked={onNextClicked} setDocuments={setDocuments} />,
        <NBF8 onNextClicked={onNextClicked} setCollaborators={setCollaborators} />,
        <NBF9 onNextClicked={onNextClicked} setComplianceEntities={setComplianceEntities} />
    
    ] 
    return( 
        <div className="container">{nbfs[index]}</div>
    )
}
export default NewBusiness

/*
const NewBusiness = ({onAdd}) => {
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
        <div className="form-control">
            <label>Last Name</label>
            <input type='text' placeholder="Client's Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        </div>
        <div className="form-control">
            <label>First Name</label>
            <input type='text' placeholder="Client's First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Address</label>
            <input type='text' placeholder="Client's Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
        </div>
        <div className='form-control form-control-check'>
            <label>Document Submitted</label>
            <input 
                type='checkbox'
                checked={submitted} 
                value={submitted} 
                onChange={(e)=>setSumbmitted(e.currentTarget.checked)}
            />
        </div>
        <input type='submit' value='Add Business' className='btn btn-block' />
    </form>
  )
}
*/