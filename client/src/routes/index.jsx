import { useRoutes } from 'react-router-dom'

export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <h1>Ana Route</h1>,
        },
    ])
}

