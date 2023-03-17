// Documents
import { useAuth } from "../hooks/useAuth"
import { useEffect, useState } from "react"
const NBF7 = () => {
    
    const [availableDocuments, setAvailableDocuments] = useState([])
    const { user } = useAuth()

    useEffect(()=>{
        console.log('NBF7 useEffect')
        // Get the available medical exams
        const fetchResource = async (resource) =>{
            let headers = new Headers()
            const token = user['token']
            const auth_str = 'Token '+token
            headers.set('Authorization', auth_str)
            let url = 'http://localhost:8000/api/'+resource+'/'
            const res = await fetch(url,{headers:headers})
            const data = await res.json()
            setAvailableDocuments(data)
            return data
        }
        if (availableDocuments.length === 0){
            console.log('fetching medicals')
            fetchResource('documents')
            
        }
    },[])
  return (
    <div>
        <h2>New Business Form - Documents Submitted</h2> 
    </div>
  )
}

export default NBF7