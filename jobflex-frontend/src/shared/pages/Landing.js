import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/UIElements/TailwindHeader'
import NewLetter from '../components/UIElements/NewsLetter'
import Feature1 from '../components/UIElements/Feature1'
const Landing = () => {

  const isButton = true

  return (
    <main>

      <Header />
      <Feature1 />
      <NewLetter />

      
    </main>
    
  )
}

export default Landing