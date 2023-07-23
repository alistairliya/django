
import {useState, useEffect} from 'react'
import {useAuth} from '../hooks/useAuth'

const BusinessDetailsAdvisorsAdvisor = (id, selectedAdvisors, roles, users, collaboratorStatuses, collaboratorPositions) => {

    const [role, setRole] = useState({})
    const [advisor, setAdvisor] = useState({})
    const [collaboratorStatus, setCollaboratorStatus] = useState({})
    const [collaboratorPosition, setCollaboratorPosition] = useState({})
    const [cfcCode, setCfcCode] = useState('')
    const [split, setSplit] = useState(0)
  
    useEffect(()=>{
        if(selectedAdvisors[id]){
            if(selectedAdvisors[id].role){
                setRole(selectedAdvisors[id].role)
            }
            if(selectedAdvisors[id].advisor){
                setAdvisor(selectedAdvisors[id].advisor)
            }
            if(selectedAdvisors[id].collaboratorStatus){
                setCollaboratorStatus(selectedAdvisors[id].collaboratorStatus)
            }
            if(selectedAdvisors[id].collaboratorPosition){
                setCollaboratorPosition(selectedAdvisors[id].collaboratorPosition)
            }
        }
    })
  
    const roleOptions = roles.map(
        (role)=>({
            value:role,
            label: role.user_role_name
        })
    )
    const advisorOptions = users.map(
        (user)=>({
            value:user,
            label: user.first_name.trim()!==''&&user.last_name.trim()!==''?user.first_name+' '+user.last_name: user.username
            
        })
    )

    const collaboratorStatusOptions = collaboratorStatuses.map(
        (collaboratorStatus)=>({
            value:collaboratorStatus,
            label: collaboratorStatus.status_name
        })
    )

    const collaboratorPositionOptions = collaboratorPositions.map(
        (collaboratorPosition)=>({
            value:collaboratorPosition,
            label: collaboratorPosition.position_name
        })
    )

    return (
    <div>BusinessDetailsAdvisorsAdvisor</div>
  )
}

export default BusinessDetailsAdvisorsAdvisor