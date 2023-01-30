import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"

const NewAddress = ({onNextClicked, setAddress}) => {
    const {user} = useAuth()
    const [unitNumber, setUnitNumber] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('') 
    const [countryList, setCountryList] = useState([])

    const onSubmit = (e) =>{
        e.preventDefault()
        
        setAddress({
            unit_number:unitNumber,
            street_address: streetAddress,
            city: city,
            postal_code: postalCode,
        })
        
        onNextClicked()
    }

    const fetchCountryList = async()=>{
        console.log('start fetchCountryList')
        let headers = new Headers()
        const token = user['token']
        const auth_str = 'Token '+token
        headers.set('Authorization', auth_str)
        let url = 'http://localhost:8000/api/country/'
        const res = await fetch(url, {headers:headers})
        const data = await res.json()
        console.log('done fetchCountryList')
        return data
    }

    useEffect(()=>{
        const getCountryList = async () =>{
            const theCountryList = await fetchCountryList()
            console.log("The Country List:")
            console.log(theCountryList)
            setCountryList(theCountryList)
        }
        getCountryList()
    },[])

  return (
    <div>
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Unit Number:</label>
            <input type='text' placeholder="Unit Number" value={unitNumber} onChange={(e)=> setUnitNumber(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Street Address</label>
            <input type='text' placeholder="Street Address" value={streetAddress} onChange={(e)=>setStreetAddress(e.target.value)} />
        </div>
        <div className="form-control">
            <label>City</label>
            <input type='text' placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} />
        </div>
        <input type='submit' value='Next' className='btn btn-block' />
    </form>
    </div>
  )
}

export default NewAddress