// Advisors Information
// Get users
// Implement roles
// Get roles
// Component to add users/roles

import {useState, useEffect} from 'react'
import {useAuth} from '../hooks/useAuth'
import NBF8Advisor from './NBF8Advisor'
import Button from './Button'

const NBF8 = ({onNextClicked}) => {
    const {user} = useAuth()
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [advisors, setAdvisors] = useState([])

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
            if(users.length === 0 && roles.length === 0){
                const getUsers = async ()=>{
                    const theUsers = await fetchResource('users')
                    setUsers(theUsers)
                }
                const getRoles = async ()=>{
                    const theRoles = await fetchResource('businessuserrole')
                    setRoles(theRoles)
                }
                getUsers()
                getRoles()
            }
            if(users.length > 0 || roles.length > 0){
                console.log('users:')
                console.log(users)
                console.log('roles:')
                console.log(roles)
            }

        },[users, roles]
    )    

    const addAdvisor = ()=>{
        setAdvisors(old => [...old, {key:old.length, users:users, roles:roles }])
    }

    return (
        <div>
            <h2>New Business Form: Advisor Information</h2>
            {advisors.map((advisor, index)=>{
                //return <NBF8Advisor key={index} />
                return (<div><NBF8Advisor key={advisor.key}/> <h2>test</h2></div>)
            })}
            <Button 
                text='Add Advisor' 
                color='red' 
                onClick={addAdvisor} 
            />
        </div>
    )
}

export default NBF8