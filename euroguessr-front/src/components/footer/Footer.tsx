import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/footer/footer.scss'
import githubIcon from '../../assets/images/icons/github.svg'

export const Footer = () => {
    return (
        <footer className='footer'>
            <div>
                &copy; 2023 - Euroguessr - <NavLink className="link" to="/privacy">Privacy</NavLink>
            </div>
            <div>
                <a href="https://github.com/EuroguessrTeam/Euroguessr" target="_blank">
                    <img src={githubIcon} alt="github" />
                </a>
                <span>Made with ❤️</span>
            </div>
        </footer>
    )
}