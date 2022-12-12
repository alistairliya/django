// from Tasks in example



const Businesses = ({businesses}) => {
  return (
    <>
      {businesses.map((business)=>(
        <h3 key={business.id}>{business.id}</h3>
      ))}
    </>
  )
}

export default Businesses