import React from 'react'
import "./Navbar.css"
import cat from "../../assets/loadcat.gif"

const Navbar = () => {
  return (
    <div className="navbar d-flex align-items-center gap-2">
      <h1 className='secondFont mt-2'>Aditya Sikarwar</h1>
      <img src={cat} alt="cat"  height={25} title='Meoww Meow'/>
    </div>
  )
}

export default Navbar