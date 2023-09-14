// rafce

import Button from "./Button"
import TextField from '@mui/material/TextField'

const BusinessDetailsDecline = ({setDeclinePopup}) => {


    const closePopup = () => {
        setDeclinePopup(false)
    }


    const handleDecline = () => {
        console.log('handleDecline')
        closePopup()
    }

  return (
    <div>
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Reason for Decline"
                multiline    
                rows={4}
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