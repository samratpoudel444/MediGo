import React, { use } from 'react'
import scope from "../assets/scope.png";
import logo from "../assets/logo.svg";

import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-25 my-10 mx-10 text-sm'>
            {/* --------left side--------- */}
            <div>
                <img onClick={()=>navigate('/home')} className='mb-2 w-20' src={scope} alt="" />
                <p className='w-full md:2/3 text-gray-900 font-semibold leading-6'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

            </div>
             {/* --------mid side--------- */}
            <div>
                <h1 className='text-xl font-medium mb-5 font-bold'><img src={logo} alt="" /></h1>
                <ul className='flex flex-col gap-2 text-black '>
                    <li> <p onClick={()=>navigate('/home')} className=' hover:text-[#5f6FFF]'>Home</p> </li>
                    <li><p onClick={()=>navigate('/about')} className='hover:text-[#5f6FFF]'>About us</p></li>
                    <li> <p onClick={()=>navigate('/contact')} className='hover:text-[#5f6FFF]'>Contact us</p> </li>
                    <li><p className='hover:text-[#5f6FFF]'>Privacy policy</p></li>

                </ul>    

            </div>
             {/* --------right side--------- */}
            <div>
                <h1 className='text-xl font-medium mb-5 mt-10 font-bold'>GET IN TOUCH</h1>
                <ul className='flex flex-col gap-2 text-gray-900 '> 
                    <li>+977-01-5400000</li>
                    <li>+977-9800000000</li>
                </ul>

            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright © {new Date().getFullYear()}. All rights reserved by MediGo</p>
        </div>


    </div>
  )
}

export default Footer;