import Phone from './NBF4PhonesPhone.js'
import {useState, useEffect} from 'react'
import Button from './Button'

const Phones = ({setPhones, existingPhones}) => {
    const [applicationPhones, setApplicationPhones] = useState([])  
    const [phoneElementList, setPhoneElementList] = useState([])
//<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>
    const [key, setKey] = useState(0)
    const addPhone = (phone) => {
        setApplicationPhones(applicationPhones.append(phone))
    }


    const addAnotherPhone = ()=>{
        console.log(phoneElementList)
        setPhoneElementList([...phoneElementList, <Phone key = {key.toString()} addPhone = {addPhone} existingPhones = {existingPhones}/>])
        setKey(key+1)
    }

    useEffect(()=>{
        //addAnotherPhone() // cant do this because useEffect is called after the UI is rendered. phoneElementList need to be already constructed.
        setPhoneElementList([<Phone key='x' addPhone = {addPhone} existingPhones = {existingPhones}/>])
    },[])


    return (
    <div>
        {
        phoneElementList.map(
            (phoneElement)=>{
                return phoneElement
            }
        )
        }
            <Button 
                text='Add another' 
                color='steelblue' 
                onClick={addAnotherPhone} 
            />
    </div>
  )
}

export default Phones