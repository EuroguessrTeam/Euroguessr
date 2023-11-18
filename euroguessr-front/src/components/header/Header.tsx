import React from 'react';
import { Link } from './Link'
import { NavLink } from 'react-router-dom';
import favicon from '../../assets/images/icons/favicon.png';
import { useState, useEffect } from 'react';
import '../../styles/header.css';
import { debounce } from '../../utils/debounce';

export const Header = () => {

    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const toggle = () => {
        setIsToggled(!isToggled);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        const handleWindowResize = debounce(() => {
            console.log('resize');
            
            if (window.innerWidth > 1000) {
                setIsToggled(false);
                setIsMobile(false);
            } else {
                setIsMobile(true);
            }
        }, 300);

        window.addEventListener('resize', handleWindowResize as EventListener);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleWindowResize as EventListener);
        }
    }, [])

    return (
        <header className={
            (isScrolled ? 'shadow-md ' : '') +
            (isToggled ? 'active ' : '') +
            'flex sticky w-screen p-3 pr-[10%] pl-[10%] flex-row justify-between items-center top-0 z-50 bg-white duration-300'
        }>
            <NavLink to='/' className='flex w-fit flex-row justify-start items-center gap-1 hover:text-blue-500 duration-300'>
                <img src={favicon} alt='Euroguessr' className='w-10 h-10 mr-2 inline-block' />
                <h1 className='font-bold text-2xl'>Euroguessr</h1>
            </NavLink>
            <nav className={
                (isToggled ? 'top-0 right-0 bg-white h-screen w-[100vw] shadow-lg box-border flex flex-col justify-center items-start gap-5 p-10'
                    : 'flex w-fit flex-row justify-center items-center gap-[5%] grow')
            }>
                <Link to='/' name='Play' />
                <Link to='/training' name='Training' />
                <Link to='/account' name='Account' />
                <Link to='/help' name='Help' />
                <Link to='/privacy' name='Privacy' />
                {isMobile && <NavLink to='/login' className='z-50 block w-fit bg-blue-500 p-2 rounded-lg border border-blue-500 text-white min-w-[85px] text-center shadow hover:bg-white hover:text-black hover:border-black duration-300'>Login</NavLink>}
            </nav>
            <div className='flex w-fit flex-row justify-start items-center gap-5'>
                {!isMobile && <NavLink to='/login' className='z-50 block w-fit bg-blue-500 p-2 rounded-lg border border-blue-500 text-white min-w-[85px] text-center shadow hover:bg-white hover:text-black hover:border-black duration-300'>Login</NavLink>}
                {
                    isMobile &&
                    <div className='toggle' onClick={toggle}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                }
            </div>
        </header>
    );
}