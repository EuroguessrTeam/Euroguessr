import React from 'react';
import { Link } from './Link'
import { NavLink } from 'react-router-dom';
import favicon from '../../assets/images/icons/favicon.png';
import { useState, useEffect } from 'react';
import { debounce } from '../../utils/debounce';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1000);
    const [isToggled, setIsToggled] = useState<boolean>(false);
    
    const toggle = () => {
        setIsToggled(!isToggled);
        document.body.classList.toggle('overflow-hidden')
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
            if (window.innerWidth > 1000) {
                setIsToggled(false);
                document.body.classList.remove('overflow-hidden')
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
            'flex sticky w-screen p-3 pr-[10%] pl-[10%] flex-row justify-between items-center top-0 z-50 bg-white duration-300 max-[1000px]:pr-[5%] max-[1000px]:pl-[5%]'
        }>
            <NavLink to='/' className='flex w-fit flex-row justify-start items-center gap-1 hover:text-blue-500 duration-300'>
                <img src={favicon} alt='Euroguessr' className='w-10 h-10 mr-2 inline-block' />
                <h1 className='font-bold text-2xl'>Euroguessr</h1>
            </NavLink>
            <nav className={
                'flex justify-center max-[1000px]:absolute ' +
                (isToggled ? 'top-0 right-0 bg-white h-screen w-[100vw] shadow-lg box-border flex-col items-start gap-5 p-10 animate-[slide-in-from-left_0.3s_ease-in-out]'
                    : 'w-fit flex-row items-center gap-[5%] grow max-[1000px]:hidden')
            }>
                <Link to='/' name='Daily' />
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
                    <div className='toggle hidden relative h-9 cursor-pointer w-9 p-1 box-border z-50 max-[1000px]:block' onClick={toggle}>
                            <span className={
                                (isToggled ? 'top-1/2 -translate-y-1/2 rotate-45 ' : '') +
                                'block absolute top-0 left-0 h-[2px] w-full bg-black duration-300'
                            }></span>
                            <span className={
                                (isToggled ? 'opacity-0 bg-transparent' : '') +
                                'block absolute top-1/2 left-0 -translate-y-1/2 h-[2px] w-full bg-black duration-300'
                            }></span>
                            <span className={
                                (isToggled ? 'bottom-1/2 -translate-y-1/2 -rotate-45 ' : '') +
                                'block absolute bottom-0 left-0 h-[2px] w-full bg-black duration-300'
                            }></span>
                    </div>
                }
            </div>
        </header>
    );
}