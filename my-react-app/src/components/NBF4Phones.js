import Phone from './NBF4PhonesPhone.js'
import {useState, useEffect} from 'react'

const Phones = ({setPhones, existingPhones}) => {
    const [applicationPhones, setApplicationPhones] = useState([])  
    const [phoneElementList, setPhoneElementList] = useState([])
//<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>

    const addPhone = (phone) => {
        setApplicationPhones(applicationPhones.append(phone))
    }

    useEffect(()=>{
        setPhoneElementList([<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>])
    },[])

    return (
    <div>
        {phoneElementList[0]}
    </div>
  )
}

export default Phones