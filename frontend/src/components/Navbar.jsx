import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return <nav className='navbar container'>
        <h4><Link className='link' to='/'>Home</Link></h4>
        <h4><Link className='link' to='/exercises'>Exercises</Link></h4>
        <h4><Link className='link' to='/create'>Log Exercise</Link></h4>
    </nav>
}

export default Navbar;