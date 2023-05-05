
import {useEffect, useState} from "react"

const BusinessDetailsContact = ({address, phone}) => {

    useEffect(()=>{
        console.log('BusinessDetailsContact useEffect()')
        console.log(address)
        console.log(phone)
    }, [address, phone])

    return (
    <div className="container">
        <h2>Application Contact</h2>
    </div>
  )
}

export default BusinessDetailsContact