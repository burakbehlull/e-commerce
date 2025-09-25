import { useRoutes } from 'react-router-dom'
import { Home, HomeLayout } from '@pages'

export default function Routes(){

    return useRoutes([
		{
			element: <HomeLayout />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
			]
		},
		
		
    ])
}

