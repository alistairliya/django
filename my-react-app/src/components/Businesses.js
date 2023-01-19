// from Tasks in example
import Business from './Business'


const Businesses = ({businesses, onEdit, onToggle}) => {
  return (
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
        <td></td>
     </tr>
     </tbody>
      {businesses.map((business)=>(
        <Business key={business.id} business={business} onEdit={onEdit} onToggle={onToggle}/>
      ))}
    </table>
  )
}

export default Businesses