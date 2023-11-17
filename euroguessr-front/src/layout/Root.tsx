import React from 'react'
import Header from '../components/header/Header'

import { Outlet } from 'react-router-dom'

const Root = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    )
}

export default Root