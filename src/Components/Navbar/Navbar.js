import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>

        <Link to="/">Notepad</Link>

        <Link to="/saved">Saved Notepads</Link>

    </nav>
  )
}

export default Navbar