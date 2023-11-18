import React from "react"
import { NavLink } from "react-router-dom"
export const Link = ({ to, name } : { to: string, name: string }) => {
    return (
        <NavLink to={to}
            className={({ isActive }) =>
                (isActive ? 'text-blue-500' : '') +
                'block w-fit hover:text-blue-500 duration-300'
            }>
            {name}
        </NavLink>
    )
}