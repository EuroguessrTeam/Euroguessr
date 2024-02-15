import React from 'react'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'

import { Outlet } from 'react-router-dom'

const Root = () => {
    return (
        <main>
            <Header />
            <section>
                <Outlet />
            </section>
            <Footer />
        </main>
    )
}

export default Root