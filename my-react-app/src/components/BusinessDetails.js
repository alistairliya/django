import Button from './Button'

const BusinessDetails = ({businessId, closeComponent}) => {
  return (
    <div className="container">
    <div>BusinessDetails {businessId}</div>
    <Button 
    text='Close' 
    color='red' 
    onClick={closeComponent} 
    />
    </div>
  )
}

export default BusinessDetails