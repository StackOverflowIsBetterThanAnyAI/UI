'use client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from '@/pages/Homepage'

export default function Home() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Homepage />,
        },
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
