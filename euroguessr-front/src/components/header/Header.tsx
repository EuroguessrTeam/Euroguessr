import React from 'react';
import Link from './Link'
import { NavLink } from 'react-router-dom';
import favicon from '../../assets/images/icons/favicon.png';
import { useState, useEffect } from 'react';

const Header = () => {

    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <header className={
            (isScrolled ? 'shadow-md ' : '') +
            'flex sticky w-screen p-3 pr-[10%] pl-[10%] flex-row justify-between items-center top-0 z-50 bg-white duration-300'
        }>
            <NavLink to='/' className='flex w-fit flex-row justify-start items-center gap-1 hover:text-blue-500 duration-300'>
                <img src={favicon} alt='Euroguessr' className='w-10 h-10 mr-2 inline-block' />
                <h1 className='font-bold text-2xl'>Euroguessr</h1>
            </NavLink>
            <nav className='flex w-fit flex-row justify-center items-center gap-[5%] grow'>
                <Link to='/' name='Play' />
                <Link to='/training' name='Training' />
                <Link to='/account' name='Account' />
                <Link to='/help' name='Help' />
                <Link to='/privacy' name='Privacy' />
            </nav>
            <div className='actions'>
                <NavLink to='/login' className='block w-fit bg-blue-500 p-2 rounded-lg border border-blue-500 text-white min-w-[85px] text-center shadow hover:bg-white hover:text-black hover:border-black duration-300'>Login</NavLink>
                <div className='toggle'></div>
            </div>
        </header>
    );
}

export default Header;