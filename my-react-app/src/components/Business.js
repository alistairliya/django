// https://www.youtube.com/watch?v=w7ejDZ8SWv8
// 47.07
import React from 'react'
import {AiFillTool} from "react-icons/ai" //https://react-icons.github.io/react-icons

const Business = ({business}) => {
  return (
    <div className='business'>
        <h3>
            {business.id}<AiFillTool style={{color:'red', cursor:'pointer'}}/>
        </h3>
        <p>{business.product}</p>       
    </div>
  )
}

export default Business