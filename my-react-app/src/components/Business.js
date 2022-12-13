// https://www.youtube.com/watch?v=w7ejDZ8SWv8
// 47.07
import React from 'react'
import {AiFillTool} from "react-icons/ai" //https://react-icons.github.io/react-icons

const Business = ({business, onEdit, onToggle}) => {
  return (
    <div className='business' onDoubleClick={()=>onToggle(business.id)}>
        <h3>
            {business.id}<AiFillTool style={{color:'red', cursor:'pointer'}} onClick={()=>onEdit(business.id)}/>
        </h3>
        <p>{business.product}</p>       
    </div>
  )
}

export default Business