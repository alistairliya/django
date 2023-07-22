
import {useState, useEffect} from 'react'
import {useAuth} from '../hooks/useAuth'
import NBF8Advisor from './NBF8Advisor'
import Button from './Button'

const BusinessDetailsAdvisors = ({}) => {
    const {user} = useAuth()
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [advisors, setAdvisors] = useState({})
    const [collaboratorStatuses, setCollaboratorStatuses] = useState([])
    const [collaboratorPositions, setCollaboratorPositions] = useState([])
    const [key, setKey] = useState(0)

    useEffect(
        ()=>{
            console.log('useEffect in NBF8')
            const fetchResource = async(resource)=>{
                let headers = new Headers()
                const token = user['token']
                const auth_str = 'Token '+token
                console.log(auth_str)
                headers.set('Authorization', auth_str)
                const res = await fetch('http://localhost:8000/api/'+resource+'/', {headers:headers})
                const data = await res.json()
                return data
            }
            if(users.length === 0 && roles.length === 0 && collaboratorStatuses.length === 0){
                const getUsers = async ()=>{
                    const theUsers = await fetchResource('users')
                    setUsers(theUsers)
                }
                const getRoles = async ()=>{
                    const theRoles = await fetchResource('businessuserrole')
                    setRoles(theRoles)
                }
                const getCollaboratorStatuses = async ()=>{
                    const theCollaboratorStatuses = await fetchResource('collaboratorstatus')
                    setCollaboratorStatuses(theCollaboratorStatuses)
                }
                const getCollaboratorPosition = async ()=>{
                    const theCollaboratorPositions = await fetchResource('collaboratorposition')
                    setCollaboratorPositions(theCollaboratorPositions)
                }
                getUsers()
                getRoles()
                getCollaboratorStatuses()
                getCollaboratorPosition()
            }
            console.log('users:')
            console.log(users)
            console.log('advisors:')
            console.log(advisors)
            console.log('collaboratorStatuses')
            console.log(collaboratorStatuses)
            console.log('collaboratorPositions')
            console.log(collaboratorPositions)
        },[users, roles, advisors, collaboratorStatuses, collaboratorPositions]
    )    


    return (
        <div>
            <h2>Business Details - Advisors</h2>
        </div>
    )
}

export default BusinessDetailsAdvisors