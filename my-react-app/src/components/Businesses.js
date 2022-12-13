// from Tasks in example
import Business from './Business'


const Businesses = ({businesses, onEdit, onToggle}) => {
  return (
    <>
      {businesses.map((business)=>(
        <Business key={business.id} business={business} onEdit={onEdit} onToggle={onToggle}/>
      ))}
    </>
  )
}

export default Businesses