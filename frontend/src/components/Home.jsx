import React from 'react'
import { NavLink } from 'react-router-dom'
function Home() {
  return (
    <div>  
         <NavLink to = "/chat-app"> lets chat</NavLink>   
    </div>
  )
}

export default Home