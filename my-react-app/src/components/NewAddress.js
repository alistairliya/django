import Select from 'react-select' // https://react-select.com/home
import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"

const NewAddress = ({onNextClicked, setAddress}) => {
    const {user} = useAuth()
    const [unitNumber, setUnitNumber] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('') 
    const [countryList, setCountryList] = useState([])
    const [countryOptions, setCountryOptions] = useState([])
    const [selecteddCountry, setSelectedCountry] = useState({})
    const [provinceOptions, setProvinceOptions] = useState([])
    const [selectedProvince, setSelectedProvince] = useState([])


    const onSubmit = (e) =>{
        e.preventDefault()
        
        setAddress({
            unit_number:unitNumber,
            street_address: streetAddress,
            city: city,
            postal_code: postalCode,
            country: selecteddCountry
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
            await setCountryList(theCountryList)
            setCountryOptions(
                theCountryList.map(
                    (country)=>(
                        {
                            value:country,
                            label:country.country_name
                        }
                    )
                    
                )
            )
            console.log("The country options:")
            console.log(countryOptions)
        }
        getCountryList()
    },[])

    const handleCountrySelection=(selected)=>{
        setSelectedCountry(selected.value)
        setProvinceOptions(
            selected.value.provinces_states.map(
                (province)=>({
                    value:province,
                    label:province.province_state_name
                })
            )
        )
    }

  return (
    <div>
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
        <div>
            <label>Country</label>
            <Select
                options={countryOptions}
                onChange={handleCountrySelection}
            />
        </div>
        <div>
            <label>Province</label>
            <Select
                options={provinceOptions}
            />
        </div>
        <form className="add-form" onSubmit={onSubmit}>
            <input type='submit' value='Next' className='btn btn-block' />
        </form>
    </div>
  )
}

export default NewAddress