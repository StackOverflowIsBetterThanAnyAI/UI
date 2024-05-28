'use client'

import { RouterProvider } from 'react-router-dom'
import { routes } from '@/routes/routes'

export default function Home() {
    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}
