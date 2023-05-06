import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {useEffect, useState} from "react"
import { useAuth } from "../hooks/useAuth"

const BusinessDetailsInsurance = ({insurance}) => {
    const { user } = useAuth()
    useEffect(()=>{
        console.log('BusinessDetailsInsurance useEffect()')
        console.log(insurance)
    }, [insurance])

    return (
        <div className="container">
            <h2>Insurance Information</h2>
        </div>
    )
}

export default BusinessDetailsInsurance