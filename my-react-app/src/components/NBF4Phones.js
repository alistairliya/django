import Phone from './NBF4PhonesPhone.js'
import {useState, useEffect} from 'react'
import Button from './Button'
import { useAuth } from "../hooks/useAuth"

const Phones = ({setPhones, existingPhones}) => {
    const {user} = useAuth()
    const [applicationPhones, setApplicationPhones] = useState([])  
    const [phoneElementList, setPhoneElementList] = useState([])
    const [phoneTypes, setPhoneTypes] = useState([])
//<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>
    const [key, setKey] = useState(0)
    const addPhone = (phone) => {
        setApplicationPhones(applicationPhones.append(phone))
    }


    const addAnotherPhone = ()=>{
        console.log(phoneElementList)
        setPhoneElementList([...phoneElementList, <Phone key = {key.toString()} addPhone = {addPhone} existingPhones = {existingPhones} phoneTypes={phoneTypes}/>])
        setKey(key+1)
    }

    const removePhoneElement = (phoneElement) =>{
        setPhoneElementList(phoneElementList.filter((element)=>element!==phoneElement))
    }

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

    // https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately
    useEffect(()=>{
        console.log('useEffect')
        const getPhoneTypes = async () =>{
            const thePhoneTypes = await fetchPhoneTypes()
            console.log("The Phone Types:")
            console.log(thePhoneTypes)
            setPhoneTypes(thePhoneTypes)
            setPhoneElementList([<Phone key='x' addPhone = {addPhone} existingPhones = {existingPhones} phoneTypes={thePhoneTypes} isPrimary = {true}/>])
        }
        getPhoneTypes()

        //addAnotherPhone() // cant do this because useEffect is called after the UI is rendered. phoneElementList need to be already constructed.
        //setPhoneElementList([<Phone key='x' addPhone = {addPhone} existingPhones = {existingPhones}/>])
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