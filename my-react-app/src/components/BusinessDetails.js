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
import BusinessDetailsFP from './BusinessDetailsFP'


const BusinessDetails = ({business, closeComponent, refreshBusinesses, forApproval=false}) => {
    const [myClient, setMyClient] = useState(null)
    const [myStatus, setMyStatus] = useState(null)
    const [updateCounter, setUpdateCounter] = useState(0)
    const [updatePayload, setUpdatePayload] = useState({}) 
    const [editMode, setEditMode] = useState(false)
    const { user } = useAuth()
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
    const getStatus = async () => {
        console.log('inside getStatus')
        let s = await fetchObject(business.status)
        console.log(s)
        setMyStatus(s)
    }

    useEffect(()=>{
        console.log('BusinessDetails useEffect()')
        console.log(business)
        console.log('refreshBusinesses')
        console.log(refreshBusinesses)

        getMyClient()
        getStatus()
        //console.log("^^^ After calling getMyClient")
    }, [business, updateCounter])

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
        //console.log("My Clinet: "+JSON.stringify(myClient))
        //refreshBusinesses()
        console.log(updatePayload)
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

    const approveClicked = () =>{
        console.log('approveClicked')
        console.log(business)
        // call the API to approve the business
        // curl -X PATCH -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' -H 'Content-Type: application/json'  -d  '{"status":"http://127.0.0.1:8000/api/businessstatus/3/"}' http://127.0.0.1:8000/api/businessapproval/1/
        // Need ID of business and ID of status
        // Hard code for now. Should be a constant somewhere.
        const approve = async () =>{
            const approvedStatus = 'http://127.0.0.1:8000/api/businessstatus/3/'
            const url = 'http://127.0.0.1:8000/api/businessapproval/' + business.id+'/'
            const data = {
                status: approvedStatus
            }
            const token = user['token']
            const auth_str = 'Token '+token
            const headers = new Headers()
            headers.set('Authorization', auth_str)
            headers.set('Content-Type', 'application/json')
            const options = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(data)
            }
            const fetchResult = await fetch(url, options)
            const updatedResult = await fetchResult.json()
            business.status = updatedResult.status
            await getStatus()
            await refreshBusinesses()
            console.log('after refreshBusinesses in approveClicked in BusinessDetails.js')
            return updatedResult
        }

        approve()


    }

    // this function is called by child component in edit mode.
    const collectUpdatePayload = (key, value) =>{
        setEditMode(true) // something is being edited
        console.log('collectUpdatePayload')
        
        console.log(key)
        console.log(value)
        setUpdatePayload({...updatePayload, [key]:value})
    }

    const sendUpdate = async () =>{
        console.log('sendUpdate')
    }

    return (
        <div className="container">
        <div>Transaction ID: {business.id}</div>
        <div>Status: {myStatus?myStatus.status_name:""}</div>
        <div>
            {forApproval?<Button text = 'Approve' color='green' onClick = {approveClicked} />:null}
        </div>
        <BusinessDetailsFP business = {business} refreshBusinesses = {refreshBusinesses} forApproval = {forApproval}/>
        <BusinessDetailsClient client={myClient} collectPayload = {collectUpdatePayload}/>
        <BusinessDetailsContact address={extractAddress()} phone={extractPhone()} collectPayload = {collectUpdatePayload}/>
        <BusinessDetailsInsurance insurance={extractInsurance()} collectPayload = {collectUpdatePayload} />
        <Button 
        text='Close'
        color='red' 
        onClick={closeComponent} 
        />
        <Button
            text = 'test'
            onClick = {test}
        />
        <Button
            text = 'Update'
            onClick = {sendUpdate}
            disabled = {!editMode}
        />
        </div>
    )
}

export default BusinessDetails