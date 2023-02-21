import Phone from './NBF4PhonesPhone.js'
import {useState, useEffect} from 'react'
import Button from './Button'
import { useAuth } from "../hooks/useAuth"

const Phones = ({addApplicationPhone, existingPhones}) => {
    //const [applicationPhones, setApplicationPhones] = useState([])  
    const [phoneElementList, setPhoneElementList] = useState([])
    const [phoneTypes, setPhoneTypes] = useState([])
//<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>
    const [key, setKey] = useState(0)
    const {user} = useAuth()



    const addAnotherPhone = ()=>{
        console.log("addAnotherPhone Pressed")
        setPhoneElementList([...phoneElementList, <Phone key = {key.toString()} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={phoneTypes} removeFromElementList={removePhoneElement}/>])
        setKey(key+1)
    }

    const removePhoneElement = (phoneElement) =>{
        setPhoneElementList(phoneElementList.filter((element)=>element!==phoneElement))
    }
    // https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately
    useEffect(()=>{
        const fetchPhoneTypes = async() =>{
            let headers = new Headers()
            const token = user['token']
            const auth_str = 'Token '+token
            headers.set('Authorization', auth_str)

            const res = await fetch('http://localhost:8000/api/phonetype/', {headers:headers})
            const data = await res.json()
            //setPhoneElementList([<Phone key='x' addPhone = {addPhone} existingPhones = {existingPhones} phoneTypes={data}/>])
            return data
        } 
        console.log('useEffect in NBF4Phones.js')
        const getPhoneTypes = async () =>{
            const thePhoneTypes = await fetchPhoneTypes()
            console.log("The Phone Types:")
            console.log(thePhoneTypes)
            setPhoneTypes(thePhoneTypes)
            setPhoneElementList([<Phone key='x' addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={thePhoneTypes} isPrimary = {true}/>])
        }
        getPhoneTypes()

        //addAnotherPhone() // cant do this because useEffect is called after the UI is rendered. phoneElementList need to be already constructed.
        //setPhoneElementList([<Phone key='x' addPhone = {addPhone} existingPhones = {existingPhones}/>])
    },[addApplicationPhone, existingPhones,user])


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
                text='Add another phone' 
                color='red' 
                onClick={addAnotherPhone} 
            />
    </div>
  )
}

export default Phones