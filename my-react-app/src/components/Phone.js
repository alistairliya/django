import {useState, useEffect} from 'react'

const Phone = ({setPhone, existingPhone}) => {
  
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
  
  
    return (
        <div>Phone
        {    
            existingPhone && existingPhone.length > 0? 
             ( 
                 // User may select from exisiting number or create one  
                 !checked?(
                     // User select from existing phone
                     <div>
                     <h2>User select from existing phone</h2>
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