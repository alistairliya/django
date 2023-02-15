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

    const getAndSetPhoneTypes = async() =>{
        let headers = new Headers()
        const token = user['token']
        const auth_str = 'Token '+token
        headers.set('Authorization', auth_str)
        const url = 'http://localhost:8000/api/phonetype/'
        const res = await fetch(url)
        const data = await res.json()
        console.log('data: ')
        console.log(data)
        await setPhoneTypes(data)
        console.log('Set phone types:')
        console.log(phoneTypes)
        return data
    } 

    // https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately
    useEffect(()=>{
        const getPhoneTypes = async () =>{
            const thePhoneTypes = await getAndSetPhoneTypes()
            setPhoneElementList([<Phone key='x' addPhone = {addPhone} existingPhones = {existingPhones} phoneTypes = {phoneTypes}/>])
            console.log('Phone types were set:')
            console.log(phoneTypes)
            console.log('thePhoneTypes:')
            console.log(thePhoneTypes)
            setPhoneTypes(thePhoneTypes)
            console.log('After set')
            console.log(phoneTypes)
        }
        getPhoneTypes()

        //addAnotherPhone() // cant do this because useEffect is called after the UI is rendered. phoneElementList need to be already constructed.
        //setPhoneElementList([<Phone key='x' addPhone = {addPhone} existingPhones = {existingPhones}/>])
    },[phoneTypes])


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