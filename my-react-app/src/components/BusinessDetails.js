import Button from './Button'

import {useEffect, useState} from "react"

const BusinessDetails = ({business, closeComponent}) => {
useEffect(()=>{
    console.log('BusinessDetails useEffect')
    console.log(business)
}, [business])

  return (
    <div className="container">
    <div>BusinessDetails {business.id}</div>
    <Button 
    text='Close' 
    color='red' 
    onClick={closeComponent} 
    />
    </div>
  )
}

export default BusinessDetails