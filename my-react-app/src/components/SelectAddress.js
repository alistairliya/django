
import Button from './Button'
import Select from 'react-select' // https://react-select.com/home
import {useState, useEffect} from 'react'

const SelectAddress = ({addresses, setAddress}) => {
    const [clientAddresses, setClientAddresses] = useState(addresses)
    const [selectedAddress, setSelectedAddress] = useState()
   
    
    const addressOptions = clientAddresses.map(
        (clientAddress) =>(
            {
                value:clientAddress,
                label:clientAddress.address.street_address+' '+clientAddress.address.city
            }
        )
    )
    
    useEffect(()=>{
        console.log('Client Addresses')
        console.log(clientAddresses)
    },[])

    const handleSelection = (selected)=>{
        console.log('handleSelection')
        setSelectedAddress(selected.value)
        console.log(selectedAddress)
    }

    const buttonClicked = ()=>{
        console.log('Clicked')    
    }

    return (
        <div>
            <label>Select an address:</label>
            <Select 
                options={addressOptions} 
                disabled={true}
                onChange={handleSelection}
            />
            <Button text = 'Next' color='steelblue' onClick={buttonClicked} />
        </div>
    )
}

export default SelectAddress