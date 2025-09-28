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
				}
			]
		},
		
		// product
		{
			element: <HomeLayout />,
			path: 'products',
			children: [
				{
					path: '',
					element: <h1>products</h1>,
				},
				{
					path: ':productId',
					element: <h1>product id</h1>,
				}
			]
		},
		
		
    ])
}

