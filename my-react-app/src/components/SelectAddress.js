
import Button from './Button'
import Select from 'react-select' // https://react-select.com/home
import {useState, useEffect} from 'react'

const SelectAddress = ({addresses, setAddress, onNextClicked}) => {
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
        //console.log('Client Addresses')
        //console.log(clientAddresses)
    },[])

    const handleSelection = (selected)=>{
        console.log('handleSelection')
        setSelectedAddress(selected.value)
    }


    const onSubmit = (e) =>{
        e.preventDefault()
        console.log('Next pressed')
        setAddress(selectedAddress)
        onNextClicked()
    }

    return (
        <div>
            <label>Select an address:</label>
            <Select 
                options={addressOptions} 
                disabled={true}
                onChange={handleSelection}
            />
            <form onSubmit={onSubmit}>
            <input type='submit' value='Next' className='btn btn-block' />  
            </form>
        </div>
    )
}

export default SelectAddress