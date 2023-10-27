import React, { useRef } from "react";
import { NavBarDropDown } from "../nav/NavbarDropDown";
import { NavLink } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
 
const NavBar: React.FC = () => {
  const user = null
  const ref = useRef<null | any>(null);
  const handleNavClick = () => {
    ref.current.complete();
  };

  return (
    <div className=' px-5  h-[75px] z-50 w-full fixed top-0 flex  bg-transparent shadow-md items-center justify-center bg-white'>
      <LoadingBar color='#2872fa' ref={ref} shadow={true} />
      <div className='h-full flex w-full lg:w-10/12 justify-between items-center '>
        <div className='h-full w-6/12 lg:w-5/12 flex justify-between'>
          <div className='h-full flex items-center '>
            <NavLink to={"/"} onClick={handleNavClick}>
              <img
                className='h-12'
                src={"logo.svg"}
                alt='logo'
              />
            </NavLink>
          </div>
        </div>

        <div className='flex items-center gap-7 '>
          {user ? (
              <NavBarDropDown />
          ) : (
            <div className='flex items-center gap-4'>
              <NavLink to={"/login"} onClick={handleNavClick}>
                <button className='bg-white rounded-md px-3 py-2 border border-slate-100 shadow-md  cursor-pointer text-black font-semibold transition duration-300 ease-in-out'>
                  Sign In
                </button>
              </NavLink>
              <NavLink to={"/register"} onClick={handleNavClick}>
                <button className='bg-primary rounded-md px-3 py-2 border border-slate-100 shadow-md hover:bg-hover cursor-pointer text-white font-semibold transition duration-300 ease-in-out'>
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;