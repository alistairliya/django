import Phone from './NBF4PhonesPhone.js'
import {useState, useEffect} from 'react'
import Button from './Button'
import { useAuth } from "../hooks/useAuth"
import React from 'react'

const Phones = ({trigger, addApplicationPhone, existingPhones}) => {
    //const [applicationPhones, setApplicationPhones] = useState([])  
    const [phoneElementList, setPhoneElementList] = useState([])
    const [testArray, setTestArray] = useState([])
    const [phoneTypes, setPhoneTypes] = useState([])
//<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>
    const [key, setKey] = useState(0)
    const {user} = useAuth()


    const addAnotherPhone = ()=>{
        console.log("addAnotherPhone Pressed")
        //setPhoneElementList([...phoneElementList, <Phone key = {key.toString()} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={phoneTypes} removeFromElementList={removePhoneElement}/>])
        //setPhoneElementList(old => [...old, <Phone key = {key.toString()} id={key.toString()} trigger={trigger} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={phoneTypes} removeFromElementList={removePhoneElement}/>] )
        setPhoneElementList(old => React.Children.toArray([...old, <Phone key = {key.toString()} id={key.toString()} trigger={trigger} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={phoneTypes} removeFromElementList={removePhoneElement}/>]))
        setKey(key+1)
        setTestArray(old=>[...old, key.toString()])
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
            setPhoneTypes(thePhoneTypes)
            // set the first phone element
            //setPhoneElementList(()=>[<Phone key='x' id='x' trigger={trigger} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={thePhoneTypes} isPrimary = {true}/>])
            if(phoneElementList.length === 0)
                setPhoneElementList(()=>React.Children.toArray(<Phone key='x' id='x' trigger={trigger} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={thePhoneTypes} isPrimary = {true}/>))
            setTestArray(old=>[...old, 'x'])
        }
        getPhoneTypes()

        //addAnotherPhone() // cant do this because useEffect is called after the UI is rendered. phoneElementList need to be already constructed.
        //setPhoneElementList([<Phone key='x' addPhone = {addPhone} existingPhones = {existingPhones}/>])
    },[ trigger,addApplicationPhone, existingPhones,user])

    useEffect(()=>{
        console.log('useEffect 2 in NBF4Phones.js')
        console.log("Key: "+key+" Trigger: "+trigger.toString())
        console.log("Phone Element Length: "+phoneElementList.length.toString())
        console.log(phoneElementList)
        console.log("Test Array Length: "+testArray.length.toString())
        console.log(testArray)
        if(trigger){
            console.log('NBF4Phones Triggered')
            //console.log(phoneElementList)
        }
    },[trigger,key, phoneElementList, testArray])

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