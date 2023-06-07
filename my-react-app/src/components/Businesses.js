// from Tasks in example
import Business from './Business'
import {useEffect, useState} from "react"


const Businesses = ({businesses, onEdit, onToggle, showApproved = true}) => { 

  const [showApprovedBusinesses, setShowApprovedBusinessess] = useState(true)

  useEffect(()=>{
    console.log('useEffect for Businesses')
    setShowApprovedBusinessess(showApproved)
  },[])

  const isBusinessYetApproved = (business) => {
    if(!showApprovedBusinesses && business.status === "http://localhost:8000/api/businessstatus/3/"){
      // Do not show approvved and business is prroved
      console.log('isBusinessYetApproved: false')
      return false
    }
    console.log('isBusinessYetApproved: true')
    console.log(showApproved)
    console.log(business.status)
    return true
  }

  return (
    <div className="container">
    <table>
      <tbody className='business'>
      <tr align="center">
        <td>Application Date</td>
        <td>Settled Date</td>
        <td>Trans ID</td>
        <td>Policy Number</td>
        <td>Status</td>
        <td>Provider</td>
        <td>Client Name</td>
        <td>Advisor</td>
        <td>Projected FYC</td>
        <td>Settled FYC</td>
        <td></td>
     </tr>
     </tbody>
      {businesses.filter(isBusinessYetApproved).map((business)=>(
        <Business key={business.id} business={business} onEdit={onEdit} onToggle={onToggle}/>
      ))}
    </table>
    </div>
  )
}

export default Businesses