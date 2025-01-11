import React from 'react'
import {HERO_CONTENT} from '../constants/index'
import profilepic from '../assets/somilaroraprofile.png';
import { motion } from "motion/react"
import { delay } from 'motion';

const container = (delay)=>({
  hidden:{x: -100, opacity: 0},
  visible:{
    x:0,
    opacity: 1,
    transition: {duration:0.5, delay: delay},
  },


})

const Hero = () => {
  return (
    <div className='border-b border-neutral-900 pb-4 lg:mb-35 '>

<div className='flex flex-wrap lg:flex-nowrap'>
  {/* Left Content */}
  <div className='w-full lg:w-1/2'>
    <div className='flex flex-col items-center lg:items-start'>
      <motion.h1 variants={container(0)} initial="hidden" animate="visible"
       className='pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl'>Somil Arora</motion.h1>
      <motion.span  variants={container(0.5)} initial="hidden" animate="visible"
      className='bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent'>Full Stack Developer</motion.span>
      <motion.p  variants={container(1)} initial="hidden" animate="visible" className='my-2 max-w-xl py-6 tracking-tighter'>{HERO_CONTENT}</motion.p>
    </div>
  </div>

  {/* Right Content */}
  <div className='w-full lg:w-1/2 lg:p-8'>
    <div className='flex justify-center items-center pt-16'>
      <motion.img 

      initial={{x:100, opacity:0}}
      animate={{x:0, opacity:1}}
      transition={{duration:1, delay:1.2}}
      
        src={profilepic} 
        alt="Profile" 
        className='w-80 h-80 rounded-full border-4 border-gray-300 object-cover relative lg:bottom-16' 
      />
    </div>
  </div>
</div>
    </div>
  )
}

export default Hero