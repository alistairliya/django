
import { useAuth } from "../hooks/useAuth";

import {useState, useEffect} from 'react'
const Notifications = () => {

    const { user } = useAuth(null);
    const [notifications, setNotifications] = useState()

    useEffect(()=>{
        //console.log(user)
        // retrieve notifiations for the user from the backend
        //const notifications = await fetchNotifications()
        console.log('useEffect in Notifications.js')
        const fetchNotifications = async()=>{
            const notifications = await fetchObject('http://localhost:8000/api/usernotification/')
            console.log('fetched notifications')
            await setNotifications(notifications)
            console.log(notifications)
            setNotifications(notifications)
        }
        if(!notifications)
        fetchNotifications()
        console.log('after fetchNotifications')
    }, [])

    const fetchObject = async (url) =>{
        let headers = new Headers()
        const token = user['token']
        const auth_str = 'Token '+token
        console.log(auth_str)
        headers.set('Authorization', auth_str)
        const res = await fetch(url,{headers:headers})
        const data = await res.json()
        console.log("Fetched Object")
        console.log(res)
        console.log(data)
        return data
    }
    return (
    <div>
        <h1>Notifications</h1>
    </div>
  )
}

export default Notifications