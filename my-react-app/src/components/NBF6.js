// Order Medical
// List of medical exams, 

import { useEffect,useState } from "react"
import { useAuth } from "../hooks/useAuth"
import NBF6CheckBoxes from './NBF6CheckBoxes'

// Select ones that apply
const NBF6 = () => {
    const { user } = useAuth()
    const [availableMedicals, setAvailableMedicals] = useState([])
    useEffect(()=>{
        console.log('NBF6 useEffect')
        // Get the available medical exams
        const fetchResource = async (resource) =>{
            let headers = new Headers()
            const token = user['token']
            const auth_str = 'Token '+token
            headers.set('Authorization', auth_str)
            let url = 'http://localhost:8000/api/'+resource+'/'
            const res = await fetch(url,{headers:headers})
            const data = await res.json()
            setAvailableMedicals(data)
            return data
        }
        if (availableMedicals.length === 0){
            console.log('fetching medicals')
            fetchResource('medical')
            
        }
        console.log('NBF6 useEffect availableMedicals:')
        console.log(availableMedicals)
    },[availableMedicals, user])

  return (
    <div>NBF6
        <NBF6CheckBoxes items={availableMedicals}/>
    </div>
  )
}

export default NBF6