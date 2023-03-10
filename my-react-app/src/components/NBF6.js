// Order Medical
// List of medical exams, 

import { useEffect,useState } from "react"
import { useAuth } from "../hooks/useAuth"

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
            console.log(data)
            return data
        }
        fetchResource('medical')
    },[])

  return (
    <div>NBF6</div>
  )
}

export default NBF6