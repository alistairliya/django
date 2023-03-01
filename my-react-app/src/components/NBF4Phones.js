import Phone from './NBF4PhonesPhone.js'
import {useState, useEffect} from 'react'
import Button from './Button'
import { useAuth } from "../hooks/useAuth"
import React from 'react'

/**
 * Two problems:
 * 1. Adding new phone number wipes out previous seleciton.
 * 2. Two phoneObj's are created.
 * 
 * Feb 22 to Feb 23 broke the part about adding new phone number wipes out previous. 
 * 
 */

const Phones = ({trigger, addApplicationPhone, existingPhones}) => {
    //const [applicationPhones, setApplicationPhones] = useState([])  
    const [phoneElementList, setPhoneElementList] = useState([])
    const [phoneTypes, setPhoneTypes] = useState([])
    const [trigger2, setTrigger2] = useState(0)
//<Phone addPhone = {addPhone} existingPhones = {existingPhones}/>
    const [key, setKey] = useState(0)
    const [phoneObjs, setPhonesObjs] = useState([])
    const {user} = useAuth()
    const [testCounter, setTestCounter] = useState(0)
    
    const test=()=>{
        console.log('test, before:'+testCounter.toString())
        setTestCounter(old=>old+1)
        console.log('test, after:'+testCounter.toString())
        console.log(phoneElementList)
    }

    const removePhoneElement = (phoneElement) =>{
        console.log('removePhoneElement')
        console.log('test counter:'+testCounter.toString())
        console.log(phoneElement)
        console.log(phoneElementList)
        //const newArray = phoneElementList.filter((element)=>element!==phoneElement)
        //console.log(newArray)
        //setPhoneElementList(newArray)
        //setPhoneElementList(phoneElementList.filter((element)=>element!==phoneElement))
        //setPhoneElementList(old => old.filter((element)=>element!==phoneElement))
    }
    
    const addAnotherPhone = ()=>{
        console.log("addAnotherPhone Pressed")
        //setPhoneElementList([...phoneElementList, <Phone key = {key.toString()} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={phoneTypes} removeFromElementList={removePhoneElement}/>])
        //setPhoneElementList(old => [...old, <Phone key = {key.toString()} id={key.toString()} trigger={trigger} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={phoneTypes} removeFromElementList={removePhoneElement}/>] )
        let phoneObj = {}
        //setPhoneElementList(old => React.Children.toArray([...old, <Phone phoneObj={phoneObj} key = {key.toString()} id={key.toString()} trigger={trigger2} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={phoneTypes} removeFromElementList={removePhoneElement}/>]))
        setPhoneElementList(old => [...old, <Phone phoneObj={phoneObj} key = {key.toString()} id={key.toString()} trigger={trigger2} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={phoneTypes} removeFromElementList={removePhoneElement}/>])
        console.log(phoneElementList)
        setPhonesObjs(old => [...old, phoneObj])
        setKey(key+1)
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
        console.log('useEffect 1 in NBF4Phones.js')
        const getPhoneTypes = async () =>{
            const thePhoneTypes = await fetchPhoneTypes()
            setPhoneTypes(thePhoneTypes)
            // set the first phone element
            if(phoneElementList.length === 0 && phoneObjs.length === 0){
                console.log('Adding the first phoneObj to phoneObjs')
                let phoneObj = {}
                setPhoneElementList(()=>React.Children.toArray(<Phone phoneObj = {phoneObj} key='x' id='x' trigger={trigger2} addApplicationPhone = {addApplicationPhone} existingPhones = {existingPhones} phoneTypes={thePhoneTypes} isPrimary = {true}/>))
                setPhonesObjs(old => [...old, phoneObj])
            }else{
                console.log('phoneObjs: ')
                console.log(phoneObjs)
            }
        }
        getPhoneTypes()

        //addAnotherPhone() // cant do this because useEffect is called after the UI is rendered. phoneElementList need to be already constructed.
        //setPhoneElementList([<Phone key='x' addPhone = {addPhone} existingPhones = {existingPhones}/>])
    },[ phoneElementList, trigger,addApplicationPhone, existingPhones,user])

    useEffect(()=>{
        console.log('useEffect 2 in NBF4Phones.js')
        console.log("Key: "+key+" Trigger: "+trigger.toString())
        console.log("Phone Element Length: "+phoneElementList.length.toString())
        console.log(phoneElementList)
        setTrigger2(trigger)
        if(trigger){
            console.log('NBF4Phones Triggered')
            //console.log(phoneElementList)
        }
    },[trigger,key, phoneElementList])

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
            <Button 
                text='TEST'
                onClick={test}

            />
    </div>
  )
}

export default Phones