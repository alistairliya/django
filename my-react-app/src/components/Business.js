// https://www.youtube.com/watch?v=w7ejDZ8SWv8
// 47.07
import React from 'react'

const Business = ({business}) => {
  return (
    <div className='business'>
        <h3>{business.id}</h3>
        <p>{business.product}</p>       
    </div>
  )
}

export default Business