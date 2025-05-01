import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'

const Header = () => {
  const {userData } = useContext(AppContext)
  return (
    <div className='flex flex-col items-center mt-20 text-center px-4 text-gray-800'>
        {/* <img src={assets.header_img} className='w-36 h-36 rounded-full mb-6' alt="" /> */}
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'Student'}! <img className='w-8 aspect-square' src={assets.hand_wave} alt="" /></h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome To Our Wellness Sync Page</h2>
        {/* <p className='mb-8 max-w-md'>SLIIT offers a range of resources to help you succeed. From library access to online databases, you have everything you need to excel in your studies.</p> */}
        <button className='border border-gray-500 rounded-full px-8 py-2.5  hover:bg-gray-100 transition-all'>Start Journey</button>
    </div>
  )
}

export default Header