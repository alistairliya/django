
import {useState, useEffect} from 'react'
import { Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Businesses from '../components/Businesses'
import NewBusiness from '../components/NewBusiness' 
import About from '../components/About' 
import { useAuth } from "../hooks/useAuth";
function Dashboard() {

  return (
      <div id="about">
        <h1>Dashboard</h1>
        <Footer/>
      </div>
  );
}

export default Dashboard;
