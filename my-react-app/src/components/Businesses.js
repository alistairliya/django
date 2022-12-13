// from Tasks in example
import Business from './Business'


const Businesses = ({businesses, onEdit}) => {
  return (
    <>
      {businesses.map((business)=>(
        <Business key={business.id} business={business} onEdit={onEdit}/>
      ))}
    </>
  )
}

export default Businesses