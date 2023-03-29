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
  
    return (
    <div>NBF8Advisor {id}
    <Select 
        options={advisorOptions}
        placeholder='Select Advisor'
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
        placeholder='Select Role'
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