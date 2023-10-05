// rafce

import Button from "./Button"
import TextField from '@mui/material/TextField'
import {useState} from "react"

const BusinessDetailsApprove = ({setPopup, setButtonsDisabled, confirmed}) => {
    const [reason, setReason] = useState('')

    const closePopup = () => {
        setPopup(false)
        setButtonsDisabled(false)
    }


    const handleApprove = () => {
        console.log('handleDecline')
        // submit to API
        setPopup(false)
        confirmed(reason)
        setButtonsDisabled(false)
    }

    const handleNotesChange = (e) => {
        console.log('handleNotesChange')
        console.log(e.target.value)
        //const { name, value } = e.target
        setReason(e.target.value)
    }
  return (
    <div>
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Notes"
                multiline    
                rows={4}
                name='myNotes'
                onChange={handleNotesChange}
            />
        </div>
        <div>
            <Button text='Confirm' onClick={handleApprove} />
            <Button text='Cancelel' onClick={closePopup} />
        </div>
    </div>
  )
}

export default BusinessDetailsApprove