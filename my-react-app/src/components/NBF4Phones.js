import Phone from './NBF4PhonesPhone.js'
import {useState} from 'react'

const Phones = ({setPhones, existingPhones}) => {
    const [applicationPhones, setApplicationPhones] = useState([])

    const addPhone = (phone) => {
        setApplicationPhones(applicationPhones.append(phone))
    }

    return (
    <div>
        <Phone addPhone = {addPhone} existingPhones = {existingPhones}/>
    </div>
  )
}

export default Phones