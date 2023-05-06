// Data from:
// Client <- WORKING ON FETCHING
// MyBusiness <- already passed down by caller
// Address and Phone <- Applicant Phone and Applicant Address
// InsuranceApplication
// BusinessUser
// BusinessCompliance
// BusinessDocument
// BusinessMedical


import Button from './Button'

import {useEffect, useState} from "react"
import { useAuth } from "../hooks/useAuth"
import BusinessDetailsClient from './BusinessDetailsClient'
import BusinessDetailsContact from './BusinessDetailsContact'
import BusinessDetailsInsurance from './BusinessDetailsInsurance'


const BusinessDetails = ({business, closeComponent}) => {
    const [myClient, setMyClient] = useState(null)
    
    const { user } = useAuth()
    useEffect(()=>{
        console.log('BusinessDetails useEffect()')
        console.log(business)

        const getMyClient = async () => {
            console.log('inside getMyClient')
            let c = await fetchObject(business.client)
            //console.log("got client!")
            //console.log('setting MyClinet')
            setMyClient(c)
            //console.log('after set MyClinet')
        }
        //console.log('>>> BusinessDetails useEffect')
        //console.log(business.client)
        //console.log("^^^ Before calling getMyClient")
        getMyClient()
        //console.log("^^^ After calling getMyClient")
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

    const test = async() =>{
        console.log("My Clinet: "+JSON.stringify(myClient))
    }

    const extractAddress = () =>{
        const app = business.insurance_application // an array
        if (app.length > 0 && app[0].applicant_address){
            return app[0].applicant_address
        }
        return null
    }
    
    const extractPhone = () =>{
        const app = business.insurance_application // an array
        if (app.length > 0 && app[0].applicant_phone){
            return app[0].applicant_phone
        }
        return null
    }

    const extractInsurance = () =>{
        console.log("extractInsurance")

        const insurance =  business.insurance_application? business.insurance_application.length > 0? business.insurance_application[0]: null : null // from an array
        //console.log(insurance)
        return insurance
    }

    return (
        <div className="container">
        <div>Transaction ID: {business.id}</div>
        <BusinessDetailsClient client={myClient}/>
        <BusinessDetailsContact address={extractAddress()} phone={extractPhone()} />
        <BusinessDetailsInsurance insurance={extractInsurance()} />
        <Button 
        text='Close' 
        color='red' 
        onClick={closeComponent} 
        />
        <Button
            text = 'test'
            onClick = {test}
        />
        </div>
    )
}

export default BusinessDetails