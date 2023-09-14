// rafce

import Button from "./Button"

const BusinessDetailsDecline = ({setDeclinePopup}) => {


    const closePopup = () => {
        setDeclinePopup(false)
    }

  return (
    <div>BusinessDetailsDecline
    <Button text='Close' onClick={closePopup} /> 
    </div>
  )
}

export default BusinessDetailsDecline