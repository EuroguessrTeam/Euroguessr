import React from 'react';
import { Daily } from '../pages/Daily';
import { Privacy } from '../pages/Privacy';
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
                element: <Privacy />
            },
            {
                path: '/login',
                element: <h1>Login</h1>
            }
        ]
    },
]

export default routes;