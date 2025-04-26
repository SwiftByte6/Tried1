import React from 'react'
import NavbarTop from '../components/NavbarTop'
import NavbarSide from '../components/NavbarSide'
import Main from '../components/Main'

const Home = () => {
  return (
    <div className='bg-gray-300 w-full h-[100vh] flex'>
      
       <NavbarSide/>
       <Main/>
    </div>
  )
}

export default Home