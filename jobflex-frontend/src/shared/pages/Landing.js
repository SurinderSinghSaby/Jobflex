import React from 'react'
import { Link } from 'react-router-dom'

import './Landing.css'

import Infocontainer from '../components/UIElements/Infocontainer'
import landingImage from '../assets/myimages/landing-image.jpg'
const Landing = () => {

  const isButton = true

  return (
    <main>
  
      <div className='landing-content'>
        <Infocontainer
          title="Job Tracking App"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam"
        />
        <Link to="/login">Login/Register</Link>
        <img src={landingImage} alt="landing" />
      </div>
    </main>
    
  )
}

export default Landing