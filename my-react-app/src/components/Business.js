// https://www.youtube.com/watch?v=w7ejDZ8SWv8
// 47.07
import React from 'react'
import {AiFillTool} from "react-icons/ai" //https://react-icons.github.io/react-icons
/*
const Business = ({business, onEdit, onToggle}) => {
  return (
    <div className={`business ${business.highlighted? 'highlighted':''}`} onDoubleClick={()=>onToggle(business.id)}>
        <td>
            {business.id}
        </td>
        <td>{business.product}</td>
        <td><AiFillTool style={{color:'red', cursor:'pointer'}} onClick={()=>onEdit(business.id)}/></td>       
    </div>
  )
}
*/
const Business = ({business, onEdit, onToggle}) => {
  let advisor = business['created_by']
  console.log('----------------------') 
  if(business.related_users.length >0){ 
    for(let related_user of business.related_users){
      if(related_user['user_role']['user_role_name']==='owner'){
        advisor = related_user.user
      }
    }
  }
  console.log('advisor...:')
  console.log(advisor)
  
  if(advisor){
    var advisor_name = advisor['username']
    
    if(advisor['first_name'] && advisor['last_name']&&(advisor['first_name'].trim()!==''||advisor['last_name'].trim()!=='')){
      advisor_name = advisor['first_name']+' '+advisor['last_name']
    }
    console.log('advisor name: '+advisor_name)
  }
  return (
    <tbody className={`business ${business.highlighted? 'highlighted':''}`} onDoubleClick={()=>onToggle(business.id)}>
    <tr >
        <td>
            {business.application_date}
        </td>
        <td>{business.settled_date}</td>
        <td>{business.id}</td>
        <td>{business.business_insurance.length>0?business.business_insurance[0]['policy_number']:''}</td>
        <td>{business.status['status_name']}</td>
        <td>{business.business_insurance.length>0?business.business_insurance[0]['insurance_application']['provider']['insurance_provider_name']:''}</td>
        <td>{business.client.first_name} {business.client.last_name}</td>
        <td>{advisor_name}</td>
        <td>{business.projected_FYC}</td>
        <td><AiFillTool style={{color:'red', cursor:'pointer'}} onClick={()=>onEdit(business.id)}/></td>       
  </tr>
  </tbody>
  )
}
export default Business