// Data from:
// Client <- WORKING ON FETCHING
// MyBusiness <- already passed down by caller
// Address
// InsuranceApplication
// BusinessUser
// BusinessCompliance
// BusinessDocument
// BusinessMedical


import Button from './Button'

import {useEffect, useState} from "react"
import { useAuth } from "../hooks/useAuth"


const BusinessDetails = ({business, closeComponent}) => {
    const [myClient, setMyClient] = useState({})
    
    const { user } = useAuth()
    useEffect(()=>{

        console.log('BusinessDetails useEffect')
        console.log(business.client)
        const getMyClient = async () => {
            let c = await fetchObject(business.client)
            await setMyClient(c)
            console.log("My Clinet: "+JSON.stringify(myClient))
        }
        getMyClient()
    }, [business])

    const fetchObject = async (url) =>{
        let headers = new Headers()
        const token = user['token']
        const auth_str = 'Token '+token
        headers.set('Authorization', auth_str)
        const res = await fetch(url,{headers:headers})
        const data = await res.json()
        return data
    }

    return (
        <div className="container">
        <div>BusinessDetails {business.id}</div>
        <Button 
        text='Close' 
        color='red' 
        onClick={closeComponent} 
        />
        </div>
    )
}

export default BusinessDetails