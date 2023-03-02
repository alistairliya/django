import {useState, useEffect} from 'react'
import Select from 'react-select' // https://react-select.com/home
import Button from './Button'

const Phone = ({phoneObj, id, trigger,  existingPhones, phoneTypes, removeFromElementList=null, isPrimary=false}) => {
    const [selectedPhone, setSelectedPhone] = useState({})
    const [checked, setChecked] = useState(false)
    
    // For creatong new phone
    const [areaCode, setAreaCode] = useState("000")
    const [phoneNumber, setPhoneNumber] = useState("0000000")
    const [phoneType, setPhoneType] = useState({})
    const [isActive, setIsActive] = useState(true)
    const [isArchived, setIsArchived] = useState(false)
    const [notes, setNotes] = useState("")

    /*
    const [phoneObj, setPhoneObj] = useState({
        area_code:areaCode,
        phone_number:phoneNumber,
        phone_type:phoneType,
        is_active:isActive,
        is_archived:isArchived,
        notes:notes
    })*/


    // Adding phone to application when NEXT is pressed in grand parent.
    useEffect(()=>{
        console.log('useEffect for NBF4PhonesPhone ID: '+id)
        //if(trigger > 0){
            // NEXT button is clicked. Add phone to application
            //console.log('NBF4PhonePhones Triggered. Next pressed. Add '+JSON.stringify(phoneObj)+' to application')
            //addApplicationPhone(phoneObj)

        //}   
    //}, [trigger, id, phoneObj])
    }, [])

    const upddateAreaCode = (areaCode)=>{
        setAreaCode(areaCode)
        //setPhoneObj({...phoneObj, area_code:areaCode})
        phoneObj['area_code'] = areaCode
    }

    const updatePhoneNumber = (phoneNumber)=>{
        setPhoneNumber(phoneNumber)
        phoneObj['phone_number'] = phoneNumber
    }

    const checkBox = ( 
           <div>
               <input 
                   type="checkbox"
                   checked={checked}
                   onChange={()=>setChecked(!checked)}
                   label="Create new phone number"
               />
               <label>Create new phone number</label>
           </div>
    )
  
  
    const phoneOptions = existingPhones? existingPhones.map(
        (existingPhone)=>({
            value:existingPhone,
            label: existingPhone.area_code+' '+existingPhone.phone_number
        })
    ):null

    const phoneTypeOptions = phoneTypes.map(
        (phoneType)=>({
            value:phoneType,
            label: phoneType.phone_type_name
        }))

    const handlePhoneTypeSelection = (selected)=>{
        phoneObj['phone_type'] = selected.value
    }

    const handleSelection = (selected)=>{
        console.log('handleSelection')
        //setPhoneObj(selected.value)
        phoneObj['selection'] = selected.value
        console.log(phoneObj)
    }

    const removeMe = ()=>{
        console.log('removeMe')
        console.log(this)
        removeFromElementList(this)
    }

    return (
        <div className="container">
        {isPrimary?(<h3>Primary Phone Number</h3>):(<h3>Additional Phone Number</h3>)}
        {               existingPhones && existingPhones.length > 0? 
             ( 
                 // User may select from exisiting number or create one  
                 !checked?(
                     // User select from existing phone
                     <div>
                     <label>Select from existing phones:</label>
                     <Select
                        options={phoneOptions}
                        onChange={handleSelection}//{setSelectedPhone}     
                     /> 
                     </div>
                 ):(
                     // User create new phonne
                     <div>
                     <h2>User creates new phone</h2>
                     <div className="form-control">
                        <label>Area Code:</label>
                        <input type='text' placeholder="Area Code:" value={areaCode} onChange={(e)=> upddateAreaCode(e.target.value)} />
                     <div className="form-control">
                        <label>Phone Number:</label>
                        <input type='text' placeholder="Phone Number" value={phoneNumber} onChange={(e)=>updatePhoneNumber(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label>Phone Type:</label>
                        <Select
                            options={phoneTypeOptions} 
                            onChange={handlePhoneTypeSelection}
                        />
                    </div>
                    </div>
                     </div>
                 )
             ):
             (
                 // user must create a new number
                     <div>
                     <h2>User creates new phone</h2>
                     <div className="form-control">
                        <label>Area Code:</label>
                        <input type='text' placeholder="Area Code:" value={areaCode} onChange={(e)=> upddateAreaCode(e.target.value)} />
                     <div className="form-control">
                        <label>Phone Number:</label>
                        <input type='text' placeholder="Phone Number" value={phoneNumber} onChange={(e)=>updatePhoneNumber(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label>Phone Type:</label>
                        <Select
                            options={phoneTypeOptions} 
                            onChange={handlePhoneTypeSelection}
                        />
                    </div>
                    </div>
                     </div>
             ) 
        }
        <div>{checkBox}</div>
        <div>{!isPrimary? <Button
            text='Remove'
            color='red'
            //onClick={()=>removeFromElementList(this)}
            //onClick={removeFromElementList(this)}
            onClick={removeMe}
        />:""}</div>
        </div>
    )
}

export default Phone