// 1. A submit button to save the data
// - Save all the collected data somewhere
// - - Save to InsuraceApplication object
// - Collaborators
// - - BusinessUser
// - - - need to reference:
// - - - -  CollaboratorStatus
// - - - -  CollaboratorPosition
// - - - - CFC Code.
// - - - Curl?

// Notes:
// - Both MyBusiness and InsuranceApplication have reference to Product
// - A client may have multiple addresses, but MyBusiness only makes reference to Client which then references to one or more addresses.
// - - May need to make a field to associate a single address with the business.
import { useEffect, useState } from "react"

import { useAuth } from "../hooks/useAuth"

const NBF10 = ({data}) => {

    const [clientId, setClientId] = useState()
    const [addressId, setAddressId] = useState()
    // From ApplicantInsurance Object
    const [applicantInsuranceFaceAmount, setApplicantInsuranceFaceAmount] = useState()
    const [applicantInsurancePlannedPremium, setApplicantInsurancePlannedPremium] = useState()
    const [applicantInsurancePlanId, setApplicantInsurancePlanId] = useState()
    const [applicantInsurancePlanTypeId, setApplicantInsurancePlanTypeId] = useState()
    const [applicantInsuranceProviderId, setApplicantInsuranceProviderId] = useState()
    const [collaborators, setCollaborators] = useState({})

    
    const { user } = useAuth()
    
    useEffect(()=>{
        console.log('NBF10 useEffect')
        console.log(data)
        processClient()
        //processAddress()
        processApplicantInsurance()
        if(clientId){
            console.log('NBF10 Client ID is set: '+clientId)
        }
        processCollaborators()
    },[data, clientId])

    // New or existing client? Need to add only if new.
    // If exisitng client, get the ID and URL
    // If new client, create the client, and get ID and URL
    const processClient = () => {
        console.log('NBF10 Create Client')
        if(data['client'].is_new_client != null){
            console.log('NBF10 Client is new')
            // To be implemented.
            // POST new client
            // Example:
            // curl -X POST -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' -H 'Content-Type: application/json'  -d  '{"first_name":"A", "last_name":"Americano","birthdate":"1999-12-09","sin":"123456789","created_date":"2023-04-02T00:00","modified_date":"2023-04-01T00:00", "created_by":"http://127.0.0.1:8000/api/users/9/","gender":"M"}' http://127.0.0.1:8000/api/clients/   

        }else{
            console.log('NBF10 Client is not new')
            setClientId(data.client.id)
        } 
    }

    // Need this only for a newly created client?
    const processAddress = () => {
        console.log('NBF10 Process Address')
        if(data['address'].is_new_address != null){
            console.log('NBF10 Address is new')
        }else{
            console.log('NBF10 Address is not new')
            setAddressId(data.address.id)
        }
    }

    // Need this only for a newly created client?
    const processPhone = () => {
        console.log('NBF10 Process Phone')
    }

    // 
    const processApplicantInsurance = () => {
        console.log('NBF10 Process Applicant Insurance')
        if(data.applicantInsurance.face_amount != null)
            setApplicantInsuranceFaceAmount(data.applicantInsurance.face_amount)
        if(data.applicantInsurance.planned_premium != null)
            setApplicantInsurancePlannedPremium(data.applicantInsurance.planned_premium)
        if(data.applicantInsurance.insurance_plan != null)
            setApplicantInsurancePlanId(data.applicantInsurance.insurance_plan.id)
        if(data.applicantInsurance.insurance_plan_type != null)
            setApplicantInsurancePlanTypeId(data.applicantInsurance.insurance_plan_type.id)
        if(data.applicantInsurance.insurance_provider != null)
            setApplicantInsuranceProviderId(data.applicantInsurance.insurance_provider.id)
    }

    const processCollaborators = () => {
        console.log('NBF10 Process Collaborators')
        if(data.collaborators!=null){
            setCollaborators(data.collaborators)
        }
        console.log(collaborators)
    }


    const postToAPI = async (url, obj) => {
        let headers = new Headers()
        const token = user['token']
        console.log('TOKEN: '+token)
        const auth_str = 'Token '+token
        headers.set('Authorization', auth_str)
        headers.set('Content-Type', 'application/json')
        const res = await fetch(url,
            {
                method:'POST',
                body:JSON.stringify(obj),
                headers:headers
            })
        const data = await res.json()
        return data
    }

    // Based on NBF1 to NBF5, can create the My Business object.
    // The remaining requires MyBusiness to be foreign keys.
    const saveData = () => {
        console.log('NBF10 Create My Business')
        
        // REST API TO POST TO MyBusiness
        // curl -X POST -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' -H 'Content-Type: application/json'  -d  '{"created_date":"2023-04-02T00:00","modified_date":"2023-04-01T00:00","client":"http://127.0.0.1:8000/api/clients/1/", "status":"http://127.0.0.1:8000/api/businessstatus/1/"}' http://127.0.0.1:8000/api/mybusiness/ 
        const postMyBusiness = async () =>{

            const mybusiness = 
            {
                // business_type. eg. Insurance <- not important at this time
                // product. eg. Life 1. FK to Product Type
                "client":"http://127.0.0.1:8000/api/clients/"+clientId+"/", 
                "status":"http://127.0.0.1:8000/api/businessstatus/1/",
                // projeted_FYC
                // application_date
                // settled_date
                // application_location
                // created_by
                "created_date":"2023-04-02T00:00",
                "modified_date":"2023-04-01T00:00",
            }
            let url = 'http://localhost:8000/api/mybusiness/'
            const data = await postToAPI(url, mybusiness)
            return data
        }



        // WORKING ON THIS RIGHT NOW!!!!
        // REST API TO POST TO InsurnaceApplication
        // curl -X POST -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' -H 'Content-Type: application/json'  -d  '{"business":"http://127.0.0.1:8000/api/mybusiness/12/","product":"http://127.0.0.1:8000/api/product/1/", "plan_type":"http://127.0.0.1:8000/api/insuranceplantype/1/","plan":"http://127.0.0.1:8000/api/insuranceplan/1/","face_amount":1.0, "planned_premium":2.0,"provider":"http://127.0.0.1:8000/api/insuranceprovider/1/"}' http://127.0.0.1:8000/api/insuranceapplication/
        // From Doc: If the Product Type of a Product points to insurance, use this table (InsuranceApplication) for insurance specific data.
        const postInsuranceApplication = async (businessId) =>{
            console.log('NBF10 Post Insurance Application')
            const insuranceApplication = {
                // business
                "business":"http://127.0.0.1:8000/api/mybusiness/"+businessId+"/",
                // product
                "product":"http://127.0.0.1:8000/api/product/1/", // <- hard coded for now
                // plan_type
                "plan_type":"http://127.0.0.1:8000/api/insuranceplantype/"+applicantInsurancePlanTypeId+"/",
                // plan
                "plan":"http://127.0.0.1:8000/api/insuranceplan/"+applicantInsurancePlanId+"/",
                // face_amount
                "face_amount":applicantInsuranceFaceAmount, 
                // planned_premium
                "planned_premium":applicantInsurancePlannedPremium,
                // provider
                "provider":"http://127.0.0.1:8000/api/insuranceprovider/"+applicantInsuranceProviderId+"/"
            }
            console.log(insuranceApplication)
            let url = 'http://localhost:8000/api/insuranceapplication/'
            const data = await postToAPI(url, insuranceApplication)
            return data

        }

        // curl -X POST -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' -H 'Content-Type: application/json'  -d  '{"user":"http://127.0.0.1:8000/api/users/9/", "business":"http://127.0.0.1:8000/api/mybusiness/23/","user_role":"http://127.0.0.1:8000/api/businessuserrole/1/","created_date":"2023-04-02T00:00","modified_date":"2023-04-01T00:00", "created_by":"http://127.0.0.1:8000/api/users/9/" }' http://127.0.0.1:8000/api/businessuser/ 
        const postBusinessUser = async (businessId) =>{
            console.log('NBF10 Post Business User')
            
            for(let k in collaborators){
                console.log('Iterate: '+k)
                console.log(collaborators[k])
                const businessUser = {
                    // user
                    "user":"http://127.0.0.1:8000/api/users/"+collaborators[k].advisor.id+"/",
                    // business
                    "business":"http://127.0.0.1:8000/api/mybusiness/"+businessId+"/",
                    // user_role
                    "user_role" : "http://127.0.0.1:8000/api/businessuserrole/"+collaborators[k].role.id+"/",
                    // collaborator_status
                    "collaborator_status" : "http://127.0.0.1:8000/api/collaboratorstatus/"+collaborators[k].collaboratorStatus.id+"/",
                    // collaborator_position
                    "collaborator_position" : "http://127.0.0.1:8000/api/collaboratorposition/" + collaborators[k].collaboratorPosition.id+"/",
                    // cfc_code
                    "cfc_code" : collaborators[k].cfcCode,
                    
                    // created_date
                    // modified_date
                    "created_date":"2023-04-02T00:00",
                    "modified_date":"2023-04-01T00:00",
                    // created_by
                    "created_by":"http://127.0.0.1:8000/api/users/9/" // <- hard coded for now
                }
                console.log('NBF10 Business User')
                console.log(businessUser)
                console.log(JSON.stringify(businessUser))
                let url = 'http://localhost:8000/api/businessuser/'
                const data = await postToAPI(url, businessUser)

            }
        }

        const save = async () =>{
            const businessObj = await postMyBusiness()
            // get the ID to mybusiness object
            // with MyBusiness ID, post to InsuranceApplication
            console.log(businessObj)
            console.log('NBF10 MyBusiness ID: '+businessObj.id)
            await postInsuranceApplication(businessObj.id)
            await postBusinessUser(businessObj.id)
        }
        save()
    }


    const onSubmit = (e) =>{
        e.preventDefault()
        // take data and save to DB
        console.log('NBF10 Submit pressed')
        saveData()
    }
    return (
    <div>{JSON.stringify(data, null, 4)}
    
      <form className="add-form" onSubmit={onSubmit}>
            <input type='submit' value='Submit' className='btn btn-block' />
      </form>
    </div>
  )
}

export default NBF10