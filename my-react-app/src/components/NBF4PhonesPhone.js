import {useState, useEffect} from 'react'
import Select from 'react-select' // https://react-select.com/home

const Phone = ({addPhone, existingPhones}) => {
    const [selectedPhone, setSelectedPhone] = useState({})
    const [checked, setChecked] = useState(false)
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