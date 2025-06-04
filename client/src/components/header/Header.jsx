import React from 'react'
import LogoutBtn from './LogoutBtn';
import { Link } from 'react-router';

function Header() {
    const authStatus = true;

  return (
    <nav className='flex my-1 w-full sm:justify-between justify-center py-2 px-2 rounded'>
        <Link to={"/"}>
        HealthCare AI
        </Link>
        <div className='sm:block hidden'>
        <ul className='flex ml-auto gap-1'>
            {authStatus && (
            <li key="logOut">
            <LogoutBtn/>
            </li>
        )}
        </ul>
        </div>
    </nav>
  )
}

export default Header