import {useState, useEffect} from 'react'
import Select from 'react-select' // https://react-select.com/home
import Button from './Button'

const Phone = ({addPhone, existingPhones, phoneTypes, removeFromElementList=null, isPrimary=false}) => {
    const [selectedPhone, setSelectedPhone] = useState({})
    const [checked, setChecked] = useState(false)
    
    // For creatong new phone
    const [areaCode, setAreaCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [phoneType, setPhoneType] = useState({})
    const [isActive, setIsActive] = useState(true)
    const [isArchived, setIsArchived] = useState(false)
    const [notes, setNotes] = useState("")
    useEffect(
        ()=>{
            console.log('PhonesPhone useEffect')
            console.log(phoneTypes)
        }
    )

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
  
  
    const phoneOptions = existingPhones.map(
        (existingPhone)=>({
            value:existingPhone,
            label: existingPhone.area_code+' '+existingPhone.phone_number
        })
    )
    const phoneTypeOptions = phoneTypes.map(
        (phoneType)=>({
            value:phoneType,
            label: phoneType.phone_type_name
        }))

    return (
        <div className="container">
        {    
            existingPhones && existingPhones.length > 0? 
             ( 
                 // User may select from exisiting number or create one  
                 !checked?(
                     // User select from existing phone
                     <div>
                     <label>Select from existing phones:</label>
                     <Select
                        options={phoneOptions}
                        onchange={setSelectedPhone}     
                     /> 
                     </div>
                 ):(
                     // User create new phonne
                     <div>
                     <h2>User creates new phone</h2>
                     <div className="form-control">
                        <label>Area Code:</label>
                        <input type='text' placeholder="Area Code:" value={areaCode} onChange={(e)=>setAreaCode(e.target.value)} />
                     <div className="form-control">
                        <label>Phone Number:</label>
                        <input type='text' placeholder="Phone Number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label>Phone Type:</label>
                        <Select
                            options={phoneTypeOptions} 
                            onChange={setPhoneType}
                        />
                    </div>
                    </div>
                     </div>
                 )
             ):
             (
                 // user must create a new number
                 <h2>user must create a new number</h2>
             ) 
        }
        <div>{checkBox}</div>
        <div>{!isPrimary? <Button
            text='Remove'
            color='red'
            onClick={()=>removeFromElementList(this)}
        />:""}</div>
        </div>
    )
}

export default Phone