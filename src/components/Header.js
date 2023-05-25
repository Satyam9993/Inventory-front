import React from 'react';
import { useDispatch } from 'react-redux';
import { setLogout } from '../state';

const Header = () => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setLogout());
    }
    return (
        <div className='border-b-2'>
            <header className="text-gray-600 body-font w-[80%] m-auto">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl font-bold"><span>Solar </span><span className='text-cyan-500'>Ladder.</span></span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

                    </nav>
                    <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0" onClick={logout}>Logout
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    )
}

export default Header;