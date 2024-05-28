import Homepage from '@/pages/Homepage'
import NotFound from '@/pages/NotFound'
import { createBrowserRouter } from 'react-router-dom'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />,
        errorElement: <NotFound />,
    },
    {
        path: '/sports',
        element: <Homepage />,
    },
    {
        path: '/social-media',
        element: <Homepage />,
    },
    {
        path: '/video',
        element: <Homepage />,
    },
    {
        path: '/service',
        element: <Homepage />,
    },
    {
        path: '/more',
        element: <Homepage />,
    },
    {
        path: '/about',
        element: <Homepage />,
    },
])
