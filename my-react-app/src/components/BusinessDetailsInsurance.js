import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {useEffect, useState} from "react"
import { useAuth } from "../hooks/useAuth"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const BusinessDetailsInsurance = ({insurance}) => {
    const { user } = useAuth()
    const [myInsurance, setMyInsurance] = useState(null)
    const [myPlan, setMyPlan] = useState(null)
    const [myPlanType, setMyPlanType] = useState(null)
    const [myProvider, setMyProvider] = useState(null)

    const [plans, setPlans] = useState(null)
    const [planTypes, setPlanTypes] = useState(null)
    const [providers, setProviders] = useState(null)

    useEffect(()=>{
        console.log('*****BusinessDetailsInsurance useEffect()')
        console.log(insurance)
        const getPlan = async () => {
            console.log('inside getPlan')
            console.log(insurance)
            const plan = await fetchObject(insurance.plan)
            const type = await fetchObject(insurance.plan_type)
            const provider = await fetchObject(insurance.provider)
            console.log("got plan")
            console.log(insurance)
            setMyInsurance(insurance)
            setMyPlan(plan)
            setMyPlanType(type)
            setMyProvider(provider)
            console.log('PROVIDER:')
            console.log(provider)
        }

        const getAvailablePlans = async () => {
            const base = "http://127.0.0.1:8000/api/" 
            let url = base + "insuranceplan/"
            const plans = await fetchObject(url)
            return plans    
        }

        const getAvailablePlanTypes = async () => {
            const base = "http://127.0.0.1:8000/api/"
            let url = base + "insuranceplantype/"
            const planTypes = await fetchObject(url)
            return planTypes
        }

        const getAvailableProviders = async () => {
            const base = "http://127.0.0.1:8000/api/"
            let url = base + "insuranceprovider/"
            const providers = await fetchObject(url)
            return providers
        }


        getPlan().then((p)=>{
                console.log("myInsurance, myPlan, myPlanType")
                console.log(myInsurance)
                console.log(myPlan)
                console.log(myPlanType)
            }
        )

        getAvailablePlans().then((p)=>{
                console.log("plans")
                console.log(p)
                setPlans(p)
            }   )
        getAvailablePlanTypes().then((p)=>{
                console.log("planTypes")
                console.log(p)
                setPlanTypes(p)
            })
        getAvailableProviders().then((p)=>{
                console.log("providers")
                console.log(p)
                setProviders(p)
            })

    }, [insurance])

    const fetchObject = async (url) =>{
        let headers = new Headers()
        const token = user['token']
        const auth_str = 'Token '+token
        headers.set('Authorization', auth_str)
        const res = await fetch(url,{headers:headers})
        const data = await res.json()
        return data
    }

    const handleChange = (event) => {
        console.log(event.target.name)
    }

    return (
        <div className="container">
            <h2>Insurance Information</h2>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >


        <div>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Provider</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={myProvider? myProvider.id:''}
          label="Provider"
          name='myProvider'
          onChange={handleChange}
        >
          {providers?providers.map((provider) => (
          <MenuItem key = {provider.id} value={provider.id}>
            {provider.insurance_provider_name}
          </MenuItem>
        )):''}
        </Select>
        </FormControl>
        </div>


            <div>
                <TextField 
                id="standard-basic" 
                label="Provider" 
                variant="standard" 
                value={myProvider ? myProvider.insurance_provider_name : ''}
                />
                <TextField 
                id="standard-basic" 
                label="Plan" 
                variant="standard" 
                value={myPlan ? myPlan.insurance_plan_name : ''}
                />
                <TextField 
                id="standard-basic" 
                label="Plan Type" 
                variant="standard" 
                value={myPlanType ? myPlanType.insurnace_plan_type_name : ''}
                />
            </div>
            <div> 
                <TextField 
                id="standard-basic" 
                label="Face Amount" 
                variant="standard" 
                value={myInsurance ? "$"+myInsurance.face_amount : ''}
                /> 
                <TextField 
                id="standard-basic" 
                label="Planned Premium" 
                variant="standard" 
                value={myInsurance ? "$"+myInsurance.planned_premium : ''}
                /> 
            </div>
            </Box>
        </div>
    )
}

export default BusinessDetailsInsurance