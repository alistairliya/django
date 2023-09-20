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
import BusinessDetailsAdvisors from './BusinessDetailsAdvisors'
import BusinessDetailsFP from './BusinessDetailsFP'
import BusinessDetailsDecline from './BusinessDetailsDecline'
import BusinessDetailsPolicyDelivery from './BusinessDetailsPolicyDelivery'


const BusinessDetails = ({business, closeComponent, refreshBusinesses, forApproval=false}) => {
    const [myClient, setMyClient] = useState(null)
    const [myInsuredClient, setMyInsuredClient] = useState(null)
    const [myStatus, setMyStatus] = useState(null)
    const [updateCounter, setUpdateCounter] = useState(0)
    const [updatePayload, setUpdatePayload] = useState({'business_id': business.id}) 
    const [editMode, setEditMode] = useState(false)
    const [updateErrors, setUpdateErrors] = useState([])
    const [applicantAddress, setApplicantAddress] = useState(null)
    const [applicantPhone, setApplicantPhone] = useState(null)
    const [insuredAddress, setInsuredAddress] = useState(null)
    const [insuredPhone, setInsuredPhone] = useState(null)
    const [sameAsApplicant, setSameAsApplicant] = useState(false)
    const [hasWriteAccess, setHasWriteAccess] = useState(false)
    const [approvalButtonsDisabled, setApprovalButtonsDisabled] = useState(false)
    const [DeclineConfirmDisplayed, setDeclineConfirmDisplayed] = useState(false)

    const { user } = useAuth()

    const getMyClient = async () => {
        console.log('inside getMyClient')
        let c = await fetchObject(business.client)
        //console.log("got client!")
        //console.log('setting MyClinet')
        setMyClient(c)
        //console.log('after set MyClinet')
    }
   
    const getInsuredClient = async () => {
        console.log('inside getInsuredClient')
        let c = await fetchObject(business.insurance_application[0].insured_client)
        //console.log("got client!")
        //console.log('setting MyClinet')
        setMyInsuredClient(c)
        //console.log('after set MyClinet')
    }
    //console.log('>>> BusinessDetails useEffect')
    //console.log(business.client)
    //console.log("^^^ Before calling getMyClient")
    const getStatus = async () => {
        console.log('inside getStatus')
        console.log(business.status)
        let s = await fetchObject(business.status)
        if(s.status_name === 'REVIEW'){
            setApprovalButtonsDisabled(false)
        }
        console.log(s)
        await setMyStatus(s)
    }

    const getWriteAcess = async () =>{
        console.log('inside getWriteAcess')
        const url = 'http://localhost:8000/api/editbusiness/get_write_access/?business_id='+business.id
        let result = await fetchObject(url)
        if(result['result'] === 'OK'){
            console.log('AAAAAAAAAAAAAAAAA has write access')
            setHasWriteAccess(true)
        }else{
            console.log('AAAAAAAAAAAAAAAAAAA does not have write access')
            setHasWriteAccess(false)
        }
    }


    useEffect(()=>{
        console.log('BusinessDetails useEffect()')
        console.log(business)
        console.log('refreshBusinesses')
        console.log(refreshBusinesses)
        // is user staff?
        console.log("########### Business Details")
        console.log(user)
        
        // is user owner?
        // Call /api/editbusiness/get_write_access/?business_id=[business.id]

        
        getWriteAcess()
        getMyClient()
        getInsuredClient()
        getStatus()
        //console.log("^^^ After calling getMyClient")
        setApplicantAddress(extractApplicantAddress())
        setApplicantPhone(extractApplicantPhone())
        setInsuredAddress(extractInsuredAddress())
        setInsuredPhone(extractInsuredPhone())
        // Insured client same as applicant when they are the same people  
        setSameAsApplicant(
            business.client===business.insurance_application[0].insured_client &&
            business.applicant_client_address===business.insurance_application[0].insured_client_address &&
            business.applicant_client_phone===business.insurance_application[0].insured_client_phone
        )
    }, [business, updateCounter, updateErrors, hasWriteAccess])

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

    const extractApplicantAddress = () => {
        return business.applicant_client_address
    }

    const extractInsuredAddress = () =>{
        const app = business.insurance_application // an array
        if (app.length > 0 && app[0].insured_client_address){
            return app[0].insured_client_address
        }
        return null
    }


    const extractApplicantPhone = () => {
        return business.applicant_client_phone
    }
    
    const extractInsuredPhone = () =>{
        const app = business.insurance_application // an array
        if (app.length > 0 && app[0].insured_client_phone){
            return app[0].insured_client_phone
        }
        return null
    }

    const extractInsurance = () =>{
        console.log("extractInsurance")

        const insurance =  business.insurance_application? business.insurance_application.length > 0? business.insurance_application[0]: null : null // from an array
        //console.log(insurance)
        return insurance
    }

    const rejectDeclineClicked = () =>{
        console.log('declineClicked')
        setApprovalButtonsDisabled(true)
        setDeclineConfirmDisplayed(true)
    }

    // Passed to BusinessDetailsDecline
    // Called when user clicks on the confirm button in BusinessDetailsDecline
    const rejectDeclineConfirmed = async (reason) =>{
        console.log('declineConfirmed')
        console.log(reason)
        const declinedStatusUrl = 'http://127.0.0.1:8000/api/businessstatus/4/' // !!!HARDCODE FOR NOW. NEED FIX LATER!!! 
        const result = await reviewHelper(declinedStatusUrl, reason)
        console.log('after approvalHelper in declineConfirmed in BusinessDetails.js')
        console.log(result)
    }

    // Important: This sets status into ACCEPTED/APPROVED
    const acceptApproveClicked = () =>{
        console.log('approveClicked')
        
        // !!!HARDCODE FOR NOW. NEED FIX LATER!!!
        let approvedStatusUrl = 'http://127.0.0.1:8000/api/businessstatus/3/' // REVIEW statst
        if(myStatus.status_name === 'PENDING'){
            approvedStatusUrl = 'http://127.0.0.1:8000/api/businessstatus/8/' // PENDING statu
        }

        
        reviewHelper(approvedStatusUrl)
    }    


    const reviewHelper = async (approvalStatusUrl, reason='') =>{
        console.log('APPROVALHELPER')
        // call the API to approve the business
        // curl -X PATCH -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' -H 'Content-Type: application/json'  -d  '{"status":"http://127.0.0.1:8000/api/businessstatus/3/"}' http://127.0.0.1:8000/api/businessapproval/1/
        // Need ID of business and ID of status
        // Hard code for now. Should be a constant somewhere.
        const sendReview = async (reason='') =>{
            const approvedStatus = approvalStatusUrl//'http://127.0.0.1:8000/api/businessstatus/3/' // !!!HARDCODE FOR NOW. NEED FIX LATER!!!
            //BusinessApprovalViewSet
            const url = 'http://127.0.0.1:8000/api/businessapproval/' + business.id+'/'
            const data = {
                status: approvedStatus,
                reason: reason
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
            if(updatedResult && updatedResult.status === approvalStatusUrl){
                setApprovalButtonsDisabled(true)
                setDeclineConfirmDisplayed(false)
            }
            return updatedResult
        }
        // result coming back is a business object
        const result = await sendReview(reason)
        console.log("sendApproval result : ")
        console.log(result)
        console.log('Approval Helper Complete')
        return result


    }

    // this function is called by child component in edit mode.
    const collectUpdatePayload = (key, value) =>{
        setEditMode(true) // something is being edited
        console.log('collectUpdatePayload')
        
        console.log(key)
        console.log(value)
        setUpdatePayload({...updatePayload, [key]:value})
    }

    const submitForReview = async () =>{
        if(!hasWriteAccess){
            alert('Only the onwer or supervisor can SUBMIT')
            return
        }
        console.log('submitForReview')
        // EditBusinessViewSet.update_status
        const url = 'http://127.0.0.1:8000/api/editbusiness/update_status/' 
        const token = user['token']
        const auth_str = 'Token '+token
        const headers = new Headers()
        headers.set('Authorization', auth_str)
        headers.set('Content-Type', 'application/json')
        const options = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({business_id:business.id, status:'REVIEW'})
        }
        const fetchResult = await fetch(url, options)
        const updatedResult = await fetchResult.json()
        if(updatedResult['data']){
            business.status = updatedResult['data']['status']
            await getStatus()
            await refreshBusinesses()
        }
 
        const errors = updatedResult['errors']
        if(errors.length === 0){
            console.log('no errors')
            setUpdateErrors(['Update successful'])
            alert('Update successful')
        }
        setUpdateErrors(errors)
        setUpdateCounter(updateCounter + 1)
    }

    const sendUpdate = async () =>{
        if(!hasWriteAccess){
            alert('Only the onwer or supervisor can EDIT')
            return
        }
        console.log('sendUpdate')
        console.log(updatePayload)
        const url = 'http://127.0.0.1:8000/api/editbusiness/edit_business/'
        const token = user['token']
        const auth_str = 'Token '+token
        const headers = new Headers()
        headers.set('Authorization', auth_str)
        headers.set('Content-Type', 'application/json')
        const options = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(updatePayload)
        }
        const fetchResult = await fetch(url, options)
        const updatedResult = await fetchResult.json()
        const errors = updatedResult['result']
        if(errors.length === 0){
            console.log('no errors')
            setUpdateErrors(['Update successful'])
            alert('Update successful')
        }
        setUpdateErrors(errors)
    }

    return (
        <div className="container">
        <div>Transaction ID: {business.id}</div>
        <div>Status: {myStatus?myStatus.status_name:""}</div>
        <div>Test: {updateCounter}</div>
        <div>
            {forApproval?// && myStatus && (myStatus.status_name ==='REVIEW' || myStatus.status_name ==='PENDING')?
                (
                    <div>
                        <Button text = {myStatus.status_name === 'REVIEW'?'Accept':'APPROVE'} color='green' onClick = {acceptApproveClicked} disabled = {approvalButtonsDisabled}  /> 
                        <Button text = {myStatus.status_name === 'REVIEW'?'Reject':'DECLINE'} color='red' onClick = {rejectDeclineClicked} disabled = {approvalButtonsDisabled} />
                    </div>)
                :null}
            {DeclineConfirmDisplayed &&
            (
                <BusinessDetailsDecline setDeclinePopup={setDeclineConfirmDisplayed} setApprovalButtonDisabled={setApprovalButtonsDisabled} declineConfirmed = {rejectDeclineConfirmed}/>
            )}
        </div>


        <div className="container">
        <BusinessDetailsClient title = "Applicant Info" client={myClient} collectPayload = {collectUpdatePayload} writeAccess = {hasWriteAccess}/>
        <BusinessDetailsContact title= "Applicant Contact" address={applicantAddress} phone={applicantPhone} collectPayload = {collectUpdatePayload} writeAccess = {hasWriteAccess}/>
        </div>

        {!sameAsApplicant?
        (
        <div className="container">
        <BusinessDetailsClient title = "Insured Info" client={myInsuredClient} collectPayload = {collectUpdatePayload} writeAccess = {hasWriteAccess}/>
        <BusinessDetailsContact title= "Insured Contact" address={insuredAddress} phone={insuredPhone} collectPayload = {collectUpdatePayload} writeAccess = {hasWriteAccess}/>
        </div>
        ):('')
        }
        
        {
        // The display of checkbox cannot depend on sameAsApplicant variable because it changes the variable.
        // It should always display when the client info is the same as the insured info. When this is the case, the checkbox gives user option to display insured info and change insured info.
        // When client info is different from insured info, checkbox is not necessary because both applicant and the insured info have to be displayed.
        }
        { business.client===business.insurance_application[0].insured_client &&
            business.applicant_client_address===business.insurance_application[0].insured_client_address &&
            business.applicant_client_phone===business.insurance_application[0].insured_client_phone?
        (<div><input 
                   type="checkbox"
                   checked={sameAsApplicant}
                   onChange={()=>setSameAsApplicant(!sameAsApplicant)}
                   disabled
        />  <label>Insured Client Same as Applicant</label></div>):('')}

        <BusinessDetailsInsurance insurance={extractInsurance()} collectPayload = {collectUpdatePayload} writeAccess = {hasWriteAccess} />
        <BusinessDetailsAdvisors advisors={business.advisors} collectPayload = {collectUpdatePayload} business={business} writeAccess = {hasWriteAccess}/>
        <div className='container'>
        <BusinessDetailsFP docName = 'First Page' business = {business} refreshBusinesses = {refreshBusinesses} forApproval = {forApproval} writeAccess = {hasWriteAccess}/>
        <BusinessDetailsFP docName = 'Commission Report' business = {business} refreshBusinesses = {refreshBusinesses} forApproval = {forApproval} writeAccess = {hasWriteAccess}/>
        
        <BusinessDetailsFP docName = 'Delivery Receipt' business = {business} refreshBusinesses = {refreshBusinesses} forApproval = {forApproval} writeAccess = {hasWriteAccess} />
        </div>
        
        <div>
            {
                // In PENDING status, PolicyDeliveryConfirmation should not be allowed to be edited
                myStatus && (myStatus.status_name === 'ACCEPTED' || myStatus.status_name === 'PENDING') &&(<BusinessDetailsPolicyDelivery business={business} refreshBusinesses={refreshBusinesses} getStatus={getStatus} hasWriteAccess={myStatus.status_name !== 'PENDING'}/>)
            }
        </div>

        <Button 
        text='Close'
        color='red' 
        onClick={closeComponent} 
        />
        <Button
            text = 'test'
            onClick = {test}
            disabled = {true}
        />
        <Button
            text = 'Update'
            onClick = {sendUpdate}
            disabled = {!editMode || !hasWriteAccess}
        />
        <Button
            text = 'Submit for Review'
            onClick = {submitForReview}
            disabled = {!hasWriteAccess || forApproval}
        />

        <div>
        {
        updateErrors.map(
            (error, index)=>{
                return <h5 key={index}>{error}</h5>
            }
        )
        }
    </div>

        </div>
    )
}

export default BusinessDetails