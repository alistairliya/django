// for selecting the advisor

import {useState, useEffect} from 'react'
import Select from 'react-select' // https://react-select.com/home

const NBF8Advisor = ({id, users, roles, updateAdvisor, selectedAdvisors}) => {
    const [role, setRole] = useState({})
    const [advisor, setAdvisor] = useState({})

    const roleOptions = roles.map(
        (role)=>({
            value:role,
            label: role.user_role_name
        })
    )
    const advisorOptions = users.map(
        (user)=>({
            value:user,
            label: user.first_name+' '+user.last_name
            
        })
    )

    useEffect(()=>{
        console.log('useEffect for NBF8Advisor ID: '+id)
        console.log('selectedAdvisors:')
        console.log(selectedAdvisors)
        if(selectedAdvisors[id]){
            console.log('selectedAdvisors[id]')
            console.log(selectedAdvisors[id])
            if(selectedAdvisors[id].role){
                console.log('selectedAdvisors[id].role')
                console.log(selectedAdvisors[id].role)
                setRole(selectedAdvisors[id].role)
            }
            if(selectedAdvisors[id].advisor){
                console.log('selectedAdvisors[id].advisor')
                console.log(selectedAdvisors[id].advisor)
                setAdvisor(selectedAdvisors[id].advisor)
            }
        }
        ///console.log(selectedAdvisors)
        //console.log(roleOptions)
        console.log('useEffect, updated role and advisor:')
        console.log(role)
        console.log(advisor)
    })
  
    return (
    <div>
    <Select
        options={advisorOptions}
        placeholder={selectedAdvisors[id] && selectedAdvisors[id].advisor? selectedAdvisors[id].advisor.first_name+' '+selectedAdvisors[id].advisor.last_name:'Select Advisor'}//'Select Advisor'
        onChange={(selectedOption)=>{
            console.log('selectedOption')
            console.log(selectedOption)
            setAdvisor(selectedOption.value)
            updateAdvisor(id, {advisor: selectedOption.value, role: role})
        }
        
    }
    />
    <Select 
        options={roleOptions}
        placeholder={selectedAdvisors[id] && selectedAdvisors[id].role? selectedAdvisors[id].role.user_role_name:'Select Role'}
        onChange={(selectedOption)=>{
            console.log('selectedOption')
            console.log(selectedOption)
            setRole(selectedOption.value)
            updateAdvisor(id, {advisor: advisor,role: selectedOption.value})
            
        }}
    />
    </div>
  )
}

export default NBF8Advisor