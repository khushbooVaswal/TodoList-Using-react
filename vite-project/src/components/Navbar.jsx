import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-violet-700 text-white py-2">
       <div className="logo"><span className="font-bold mx-8 text-xl"> iLogo</span></div>
        <ul className="flex gap-5 mx-9 ">
            <li className='cursor-pointer hover:font-bold  transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold  transition-all duration-75'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
