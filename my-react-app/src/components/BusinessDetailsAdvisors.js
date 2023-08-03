
import {useState, useEffect} from 'react'
import {useAuth} from '../hooks/useAuth'
import NBF8Advisor from './NBF8Advisor'
import BusinessDetailsAdvisorsAdvisor from './BusinessDetailsAdvisorsAdvisor'
import Button from './Button'

const BusinessDetailsAdvisors = ({collectPayload}) => {
    const {user} = useAuth()

    const [users, setUsers] = useState([]) // all the users of the system 
    const [roles, setRoles] = useState([])
    const [advisors, setAdvisors] = useState({})
    const [collaboratorStatuses, setCollaboratorStatuses] = useState([])
    const [collaboratorPositions, setCollaboratorPositions] = useState([])
    const [key, setKey] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('white');

    useEffect(
        ()=>{
            console.log('useEffect in BusinessDetailsAdvisors')
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
            //console.log('users:')
            //console.log(users)
            console.log('advisors:')
            console.log(advisors)
            //console.log('collaboratorStatuses')
            //console.log(collaboratorStatuses)
            //console.log('collaboratorPositions')
            //console.log(collaboratorPositions)
            if(editMode){
                console.log('EDIT MODE')
                setBackgroundColor('lightblue')
                collectPayload('collaborators', advisors)
            }
        },[editMode, users, roles, advisors, collaboratorStatuses, collaboratorPositions]
    )    

    const addAdvisor = ()=>{
        console.log('addAdvisor...'+key.toString())
        setAdvisors({...advisors, [key]:{} })
        console.log('after setAdvisors')
        setKey(key+1)
    }

    // returns a function that removes the advisor
    // Used by JSX below to create a function for each remove button
    const removevAdvisor = (key)=>{
        console.log('removevAdvisor building function for key: '+key.toString())
        return ()=>{
            const newAdvisors = {...advisors}
            delete newAdvisors[key]
            setAdvisors(newAdvisors)
            setEditMode(true)
        }
    }

    const updateAdvisor = (key, value)=>{
        console.log('updateAdvisor')
        console.log(key)
        console.log(value)
        const newAdvisors = {...advisors}
        newAdvisors[key] = value
        setAdvisors(newAdvisors)
        setEditMode(true)
    }


    return (
        <div className="container">
            <h2>New Business Form: Advisor Information</h2>
            {Object.keys(advisors).map((key, index)=>{
                //return <NBF8Advisor key={index} />
                return (
                    <div key= {key} className='container'>
                        <NBF8Advisor 
                            id={key}
                            users={users} 
                            roles={roles} 
                            updateAdvisor = {updateAdvisor} 
                            selectedAdvisors = {advisors} 
                            collaboratorStatuses = {collaboratorStatuses} 
                            collaboratorPositions ={collaboratorPositions} /> 
                        <Button 
                            text='Remove' 
                            onClick={removevAdvisor(key)} />
                    </div>
                )
            })}
            <Button 
                text='Add Advisor' 
                color='red' 
                onClick={addAdvisor} 
            />
        </div>
    )
}

export default BusinessDetailsAdvisors