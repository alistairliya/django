// Insurance Information:
// x Insurance Provider - selection
// x Insurance Plan Type - selection
// x Insurancce Plan - selection
// Face Amount - text box
// Planned Premium - text box
// Order Medical - NBF6

import { useAuth } from "../hooks/useAuth"
import {useState, useEffect} from 'react'
import Select from "react-select"

const NBF5 = ({setInsuranceInfo}) => {


    const { user } = useAuth()
    const [insuranceProviders, setInsuranceProviders] = useState([])
    const [insurancePlanTypes, setInsurancePlanTypes] = useState([])
    const [insurancePlans, setInsurancePlans] = useState([])
    const [faceAmount, setFaceAmount] = useState('')   
    const [plannedPremium, setPlannedPremium] = useState('')
    

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

        const getInsurancePlans = async() =>{
            const insPlans = await fetchResource('insuranceplan')
            setInsurancePlans(insPlans)
            console.log(insPlans)
        }

        getInsurancePlanTypes()
        getInsuranceProviders()
        getInsurancePlans()
   },[])//,[user, insuranceProviders, insurancePlanTypes])
   
   const planTypeOptions = insurancePlanTypes.map((planType) => (
    {value: planType,
    label: planType.insurnace_plan_type_name
   }))

   const insuranceProviderOptions = insuranceProviders.map((provider) => (
    {value: provider,
    label: provider.insurance_provider_name
    }))

    const insurancePlanOptions = insurancePlans.map((plan) => (
        {value: plan,
        label: plan.insurance_plan_name
    }))

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log('onSubmit')
        setInsuranceInfo({
        })
    }

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
        <label>Select Insurance Plan:</label>
        <Select
            options={insurancePlanOptions}
            onChange = {e => console.log(e)}
        />
        <div className="form-control">
            <label>Face Amount:</label>
            <input type='text' 
                    placeholder="Face Amount" 
                    value={faceAmount} 
                    onChange={(e)=> setFaceAmount(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Planned Premium:</label>
            <input type='text' 
                    placeholder="Planned Premium" 
                    value={plannedPremium} 
                    onChange={(e)=> setPlannedPremium(e.target.value)} />
        </div>
        <form className="add-form" onSubmit={onSubmit}>
            <input type='submit' value='Next' className='btn btn-block' />
        </form>
    </div>
  )
}

export default NBF5