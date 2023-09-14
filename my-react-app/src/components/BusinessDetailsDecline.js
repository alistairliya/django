// rafce

import Button from "./Button"
import TextField from '@mui/material/TextField'
import {useEffect, useState} from "react"

const BusinessDetailsDecline = ({setDeclinePopup, declineConfirmed}) => {

    const [reason, setReason] = useState('')

    const closePopup = () => {
        setDeclinePopup(false)
    }


    const handleDecline = () => {
        console.log('handleDecline')
        // submit to API
        declineConfirmed()
        setDeclinePopup(false)
        declineConfirmed(reason)
    }

    const handleReasonChange = (e) => {
        console.log('handleReasonChange')
        console.log(e.target.value)
        //const { name, value } = e.target
        setReason(e.target.value)
    }

  return (
    <div>
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Reason for Decline"
                multiline    
                rows={4}
                name='myReason'
                onChange={handleReasonChange}
            />
        </div>
        <div>
            <Button text='Confirm' onClick={handleDecline} />
            <Button text='Cancelel' onClick={closePopup} />
        </div>
    </div>
  )
}

export default BusinessDetailsDecline