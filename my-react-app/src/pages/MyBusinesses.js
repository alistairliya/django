

import {useState, useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Businesses from '../components/Businesses'
import NewBusiness from '../components/NewBusiness' 
//import About from '../components/About' 
import { useAuth } from "../hooks/useAuth";
function MyBusinesses() {

    const { user } = useAuth();
  const [showAddBusiness, setShowAddBusiness] = useState(false)


  const [businesses, setBusinesses] = useState(
    [/*
      {
        "id": 1,
        "business_type": "http://127.0.0.1:8000/api/businesstype/1/",
        "product": "http://127.0.0.1:8000/api/product/1/",
        "client": "http://127.0.0.1:8000/api/clients/1/",
        "status": "http://127.0.0.1:8000/api/businessstatus/1/",
        "projected_FYC": 1.0,
        "application_date": "2022-12-09",
        "application_location": "Kaohsiung",
        "created_by": "eugene",
        "created_date": "2022-12-09T13:22:00Z",
        "modified_date": "2022-12-09T13:22:00Z",
        "highlighted": false
      },
      {
        "id": 2,
        "business_type": "http://127.0.0.1:8000/api/businesstype/1/",
        "product": "http://127.0.0.1:8000/api/product/1/",
        "client": "http://127.0.0.1:8000/api/clients/1/",
        "status": "http://127.0.0.1:8000/api/businessstatus/1/",
        "projected_FYC": 2.0,
        "application_date": "2022-12-12",
        "application_location": "Vancouver",
        "created_by": "eugene",
        "created_date": "2022-12-12T15:52:00Z",
        "modified_date": "2022-12-12T15:52:00Z",
        "highlighted": false
      }*/
    ]
  )

  useEffect(()=>{
    const getBusinesses = async() => {
      const businessesFromServer = await fetchBusiness()
      setBusinesses(businessesFromServer)      
    }
    getBusinesses()
  }, [])

  const fetchBusiness = async()=>{
    let headers = new Headers()
    const token = user['token']
    console.log('About to fetch with token '+token)
    //const auth_str = 'Basic '+btoa('test:test123!') 
    
    const auth_str = 'Token '+token 
    console.log(auth_str)
    headers.set('Authorization', auth_str)
    const res = await fetch('http://localhost:8000/api/mybusiness/',{headers:headers})
    const data = await res.json()
    console.log(data)
    return data
  }

  // from Add Task example, 1:09:33
  const addBusiness = (business) => {
    const id = Math.floor(Math.random() * 10000) + 1
    console.log(id)
    console.log(business)
    const newBusiness = {id, ...business}
    setBusinesses([...businesses, newBusiness])
  }
  
  // from Delete Task in example, 52:31, deleteTask
  const editBusiness = (id) =>{
    console.log('edit', id)
    //setBusinesses(businesses.filter((business)=>business.id!=id)) // example from deleting task 55:30
  }

  // Using toggleReminder in example 57:53
  const toggleReminder = (id) => {
    console.log('toggle', id)
    setBusinesses(businesses.map((business)=>business.id === id? {...business, highlighted: !business.highlighted }: business))
  }

  return (
    <div className="container">
      <Header 
        title='My Businesses'
        onAdd={()=>setShowAddBusiness(!showAddBusiness)}
        showAdd = {showAddBusiness}
      />
      {showAddBusiness && <NewBusiness onAdd={addBusiness} />}
      {businesses.length > 0?(
        <Businesses 
          businesses = {businesses} 
          onEdit = {editBusiness} 
          onToggle={toggleReminder}
        /> 
      ):( 
        'No business to show'
      )}
      <Footer />
    </div>
  );
}

export default MyBusinesses;
