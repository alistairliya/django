import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {useEffect, useState} from "react"
import { useAuth } from "../hooks/useAuth"

const BusinessDetailsInsurance = ({insurance}) => {
    const { user } = useAuth()
    const [myInsurance, setMyInsurance] = useState(null)
    useEffect(()=>{
        console.log('BusinessDetailsInsurance useEffect()')
        //console.log(insurance)
        const getPlan = async () => {
            console.log('inside getPlan')
            const p = await fetchObject(insurance.plan)
            const t = await fetchObject(insurance.plan_type)
            //console.log("got plan")
            console.log(insurance)
            setMyInsurance(insurance)

        }
        getPlan()
        console.log("myInsurance...")
        console.log(myInsurance)
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

    return (
        <div className="container">
            <h2>Insurance Information</h2>
        </div>
    )
}

export default BusinessDetailsInsurance