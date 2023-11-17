import React from "react"
import { NavLink } from "react-router-dom"
const Link = (props: {to: string, name: string}) => {
    return (
        <NavLink to={props.to}
            className={({ isActive }) => [
                isActive ? 'text-blue-500' : '',
                'block w-fit hover:text-blue-500 duration-300'
            ].join(' ')}>
            {props.name}
        </NavLink>
    )
}

export default Link