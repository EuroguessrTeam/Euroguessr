import React from 'react';
import Daily from '../pages/Daily';
import Root from '../layout/Root';

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Daily />
            },
            {
                path: '/training',
                element: <h1>Training</h1>
            },
            {
                path: '/account',
                element: <h1>Account</h1>
            },
            {
                path: '/help',
                element: <h1>Help</h1>
            },
            {
                path: '/privacy',
                element: <h1>Privacy</h1>
            },
            {
                path: '/login',
                element: <h1>Login</h1>
            }
        ]
    },
]

export default routes;