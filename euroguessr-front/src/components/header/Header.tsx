import React from 'react';
import { NavLink } from 'react-router-dom';
import favicon from '../../assets/images/icons/favicon.png';
import { useState, useEffect } from 'react';
import '../../styles/header/header.scss';
import { FadeUp } from '../animations/FadeUp'
import { debounce } from '../../utils/debounce';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isToggled, setIsToggled] = useState<boolean>(false);
    
    const toggle = () => {
        setIsToggled(!isToggled);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) setIsScrolled(true);
            else setIsScrolled(false);
        }

        const handleResize = debounce(() => {
            if (window.innerWidth > 1000) setIsToggled(false);
        }, 300);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize as EventListener);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize as EventListener);
        }
    }, [])

    return (
        <header className={`${isScrolled ? 'scrolled' : ''} ${isToggled ? 'toggled' : ''}`}>
            <NavLink to='/' className="icon">
                <img src={favicon} alt='Euroguessr' />
                <h1>Euroguessr</h1>
            </NavLink>
            <nav>
                <FadeUp damping={0.075}>
                    <NavLink to='/' className={({ isActive }) => `${isActive ? 'active' : ''}`} onClick={() => setIsToggled(false)}>Daily</NavLink>
                    <NavLink to='/training' className={({ isActive }) => `${isActive ? 'active' : ''}`} onClick={() => setIsToggled(false)}>Training</NavLink>
                    <NavLink to='/account' className={({ isActive }) => `${isActive ? 'active' : ''}`} onClick={() => setIsToggled(false)}>Account</NavLink>
                    <NavLink to='/help' className={({ isActive }) => `${isActive ? 'active' : ''}`} onClick={() => setIsToggled(false)}>Help</NavLink>
                    <NavLink to='/privacy' className={({ isActive }) => `${isActive ? 'active' : ''}`} onClick={() => setIsToggled(false)}>Privacy</NavLink>
                    <NavLink to='/login' className="button">Login</NavLink>
                </FadeUp>
            </nav>
            <div className='actions'>
                <NavLink to='/login' className="button">Login</NavLink>
                <div onClick={toggle} className='toggle'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
}