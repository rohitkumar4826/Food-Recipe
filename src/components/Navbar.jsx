import {useEffect, useState } from 'react';

import logo from '../assets/images/pan.png';
import PrimaryBtn from './PrimaryBtn';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    const isAuth = localStorage.getItem("user");
    const [showMobileMenu, setShowMobileMenu] = useState(true);

    // FUNCTIONS
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth>768 && showMobileMenu==false){
                setShowMobileMenu(true);
            }else if(window.innerWidth<=768 && showMobileMenu!=false){
                setShowMobileMenu(true);
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Remove event listener on component unmount

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerwidth]);
  return (
    <div className='p-2 flex justify-between sm:justify-around items-center'>
        <div className='text-3xl font-bold cursor-pointer flex justify-center items-center'>
            <img src={logo} alt="logo" className='w-16'/>
            CulinaShare
        </div>
        <div className={showMobileMenu ? "md:flex hidden" : "flex flex-col absolute top-20 z-20 left-0 w-full justify-evenly items-center h-4/5 child:font-bold child:text-2xl child:text-white bg-green-100"}>
            <div className='bg-green-200 p-2 rounded-sm my-4 md:mx-5 hover:text-gray-400 cursor-pointer' onClick={()=>navigate('/')}>Home</div>
            <div className='bg-green-200 p-2 rounded-sm my-4 md:mx-5 hover:text-gray-400 cursor-pointer' onClick={()=>navigate('/about')}>About Us</div>
            <div className='bg-green-200 p-2 rounded-sm my-4 md:mx-5 hover:text-gray-400 cursor-pointer' onClick={()=>navigate('/new-recipe')}>Recipes</div>
            <div className='bg-green-200 p-2 rounded-sm my-4 md:mx-5 hover:text-gray-400 cursor-pointer' onClick={()=>navigate('/saved')}>Saved</div>
        </div>
        <div className='flex'>
            <PrimaryBtn title="Create +" handleClick={()=>navigate('/new-recipe')}/>
            {!isAuth && <div className='mx-2 px-5 py-1 border-2 border-black font-bold text-lg bg-black text-white hover:bg-white hover:text-black cursor-pointer' onClick={()=>navigate('/register')}>Log In</div>}
        </div>
        <div className='md:hidden cursor-pointer flex-col border-2 border-slate-900 rounded-md p-1 hover:bg-gray-100' onClick={()=>setShowMobileMenu(!showMobileMenu)}>
            <div className='w-6 p-0.5 m-0.5 bg-black'></div>
            <div className='w-6 p-0.5 m-0.5 bg-black'></div>
            <div className='w-6 p-0.5 m-0.5 bg-black'></div>
        </div>
    </div>
  )
}

export default Navbar;