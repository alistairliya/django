import Phone from './NBF4PhonesPhone.js'
import {useState} from 'react'

const Phones = ({setPhones, existingPhones}) => {
    const [phone, setPhone] = useState({})

    return (
    <div>
        <Phone setPhone = {setPhone} existingPhones = {existingPhones}/>
    </div>
  )
}

export default Phones