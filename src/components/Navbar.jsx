import React from 'react'
import logo from "../assets/SomilAroralogo.png";
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from "react-icons/si";



const Navbar = () => {
  return (
    <nav className=' flex items-center justify-between  '>
        <div className='flex flex-shrink-0 items-center  '>
            
            <img  src={logo} alt="" className='absolute top-2 left-2 w-12 h-auto mx-2 py-2' />
       
         
        </div>
        <div  className=' m-8 flex items-center justify-center gap-4 text-2xl '>
           <a href="https://www.linkedin.com/in/somil855/"> <FaLinkedin/></a>
            <a href="https://github.com/Somilstar"><FaGithub/></a>
           <a href="https://leetcode.com/u/somil855/"> <SiLeetcode />
           </a>
           <a href="https://x.com/somil855"> <FaSquareXTwitter/></a>
         
         
        </div>

    </nav>
  )
}

export default Navbar