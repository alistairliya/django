
import {useState, useEffect} from 'react'

const SelectAddress = (addresses, setAddress) => {
    const [clientAddresses, setClientAddresses] = useState(addresses)
/*
    const addressOptions = addresses.map(
        (address) =>(
            {
                value:address,
                label:''
            }
        )
    )
*/
    useEffect(()=>{
        console.log(clientAddresses)
    },[])
    return (
       <div>SelectAddress</div>
    )
}

export default SelectAddress