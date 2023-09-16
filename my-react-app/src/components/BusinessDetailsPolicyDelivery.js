//rafce

import BusinessDetailsFP from './BusinessDetailsFP'

const BusinessDetailsPolicyDelivery = ({business, refreshBusinesses, hasWriteAccess = true}) => {
  return (
    <div className='container'>
        <h2>Policy Delivery Confirmation</h2>
        <BusinessDetailsFP docName = ' ' business = {business} refreshBusinesses = {refreshBusinesses}  writeAccess = {hasWriteAccess} />
    </div>
  )
}

export default BusinessDetailsPolicyDelivery