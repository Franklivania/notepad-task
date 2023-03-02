import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>

        <Link to="/" className='link'>Notepad</Link>

        <Link to="/saved" className='link'>Saved Notepads</Link>

    </nav>
  )
}

export default Navbar