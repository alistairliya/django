import Phone from './NBF4PhonesPhone.js'
import {useState, useEffect} from 'react'

const Phones = ({setPhones, existingPhones}) => {
    const [applicationPhones, setApplicationPhones] = useState([])  
    const [phoneElementList, setPhoneElementList] = useState([])
//<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>

    const addPhone = (phone) => {
        setApplicationPhones(applicationPhones.append(phone))
    }


    const addAnotherPhone = ()=>{
        setPhoneElementList(phoneElementList + (<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>))
    }

    useEffect(()=>{
        //addAnotherPhone() // cant do this because useEffect is called after the UI is rendered. phoneElementList need to be already constructed.
        setPhoneElementList([<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>])
    },[])



    return (
    <div>
        {phoneElementList.map(
            (phoneElement)=>{
                return phoneElement
            }
        )}
    </div>
  )
}

export default Phones