// from Tasks in example
import Business from './Business'


const Businesses = ({businesses}) => {
  return (
    <>
      {businesses.map((business)=>(
        <Business key={business.id} business={business}/>
      ))}
    </>
  )
}

export default Businesses