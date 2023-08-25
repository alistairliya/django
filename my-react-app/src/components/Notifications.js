
import { useAuth } from "../hooks/useAuth";

import {useState, useEffect} from 'react'
const Notifications = () => {

    const { user } = useAuth();

    useEffect(()=>{
        //console.log(user)
        // retrieve notifiations for the user from the backend
    }, [])


    return (
    <div>

    </div>
  )
}

export default Notifications