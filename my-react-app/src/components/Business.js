// https://www.youtube.com/watch?v=w7ejDZ8SWv8
// 47.07
import React from 'react'
import {useEffect, useState} from "react"
import {AiFillTool, AiOutlineFilePdf, AiOutlineUpload} from "react-icons/ai" //https://react-icons.github.io/react-icons
import { useAuth } from "../hooks/useAuth"
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

  const [client, setClient] = useState({})

  let advisor = business['created_by']
  //console.log('----------------------') 
  if(business.related_users.length >0){ 
    for(let related_user of business.related_users){
      if(related_user['user_role']['user_role_name']==='owner'){
        advisor = related_user.user
      }
    }
  }
  //console.log('advisor...:')
  //console.log(advisor)
  
  if(advisor){
    var advisor_name = advisor['username']
    
    if(advisor['first_name'] && advisor['last_name']&&(advisor['first_name'].trim()!==''||advisor['last_name'].trim()!=='')){
      advisor_name = advisor['first_name']+' '+advisor['last_name']
    }
    //console.log('advisor name: '+advisor_name)
  }

  const {user} = useAuth()
  useEffect(()=>{
    const url = business.client
    const fetchResource = async () =>{
        let headers = new Headers()
        const token = user['token']
        const auth_str = 'Token '+token
        headers.set('Authorization', auth_str)
        const res = await fetch(url,{headers:headers})
        const data = await res.json()
        //console.log("\n***CLIENT: ")
        //console.log(data)
        setClient(data)
        return data
    }
    if (client.id === undefined){
        //console.log('fetching client')
        fetchResource() 
    }

  },[client])

  const showPdfLink = () =>{
    
    if(business.files.length>0){
      const url = business.files[business.files.length - 1].file
      const onClick = () =>{
        window.open(url, '_blank', 'fullscreen=yes')
      }



      return <AiOutlineFilePdf onClick={onClick}/>
    }else{
      //return <AiOutlineUpload />
      return null
    }
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
        <td>{client.first_name} {client.last_name}</td>
        <td>{advisor_name}</td>
        <td>{business.projected_FYC}</td>
        <td>{business.settled_FYC}</td>
        <td>
          <AiFillTool style={{color:'red', cursor:'pointer'}} onClick={()=>onEdit(business)}/>
          {showPdfLink()}
        </td>       
  </tr>
  </tbody>
  )
}
export default Business