import {useState, useEffect} from 'react'
import Select from 'react-select' // https://react-select.com/home

const Phone = ({addPhone, existingPhones}) => {
    const [selectedPhone, setSelectedPhone] = useState({})
    const [checked, setChecked] = useState(false)
    
    // For creatong new phone
    const [areaCode, setAreaCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [phoneType, setPhoneType] = useState({})
    const [isPrimary, setIsPrimary] = useState(true)
    const [isActive, setIsActive] = useState(true)
    const [isArchived, setIsArchived] = useState(false)
    const [notes, setNotes] = useState("")
    
    const checkBox = ( 
           <label>
               <input 
                   type="checkbox"
                   checked={checked}
                   onChange={()=>setChecked(!checked)}
               />
               Create new phone number
           </label>
    )
  
  
    const phoneOptions = existingPhones.map(
        (existingPhone)=>({
            value:existingPhone,
            label: existingPhone.area_code+' '+existingPhone.phone_number
        })
    )
    return (
        <div>Phone
        {    
            existingPhones && existingPhones.length > 0? 
             ( 
                 // User may select from exisiting number or create one  
                 !checked?(
                     // User select from existing phone
                     <div>
                     <label>Select from existing:</label>
                     <Select
                        options={phoneOptions}
                        onchange={setSelectedPhone}     
                     />
                
                     {checkBox}
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
                    </div>
                     {checkBox}
                     </div>
                 )
             ):
             (
                 // user must create a new number
                 <h2>user must create a new number</h2>
             ) 
        }
        </div>
    )
}

export default Phone