// Insurance Information:
// x Insurance Provider - selection
// x Insurance Plan Type - selection
// Insurancce Plan - selection
// Face Amount - text box
// Planned Premium - text box
// Order Medical - NBF6

import { useAuth } from "../hooks/useAuth"
import {useState, useEffect} from 'react'
import Select from "react-select"

const NBF5 = () => {


    const { user } = useAuth()
    const [insuranceProviders, setInsuranceProviders] = useState([])
    const [insurancePlanTypes, setInsurancePlanTypes] = useState([])
    

   useEffect(()=>{
        console.log('NBF5')
        const fetchResource = async(resource) =>{
            let headers = new Headers()
            const token = user['token']
            const auth_str = 'Token '+token
            headers.set('Authorization', auth_str)
            let url = 'http://localhost:8000/api/'+resource+'/'
            console.log(url)
            const res = await fetch(url,{headers:headers})
            const data = await res.json()
            return data
        }
        // Get Insurnace Providers
        const getInsuranceProviders = async() =>{
            const insProvider = await fetchResource('insuranceprovider')
            setInsuranceProviders(insProvider)
            console.log(insProvider)
        }
        const getInsurancePlanTypes = async() =>{
            const insPlanTypes = await fetchResource('insuranceplantype')
            setInsurancePlanTypes(insPlanTypes)
            console.log(insPlanTypes)
        }
        getInsurancePlanTypes()
        getInsuranceProviders()
   },[])//,[user, insuranceProviders, insurancePlanTypes])
   
   const planTypeOptions = insurancePlanTypes.map((planType) => (
    {value: planType,
    label: planType.insurnace_plan_type_name
   }))

   const insuranceProviderOptions = insuranceProviders.map((provider) => (
    {value: provider,
    label: provider.insurance_provider_name
    }))

  return (
    <div>
        <label>Select Plan Type:</label>
        <Select
            options={planTypeOptions}
            onChange = {e => console.log(e)}
        />
        <label>Select Insurnace Provider:</label>
        <Select
            options={insuranceProviderOptions}
            onChange = {e => console.log(e)}
        />
    </div>
  )
}

export default NBF5