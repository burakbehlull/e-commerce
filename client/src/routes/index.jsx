import { useRoutes } from 'react-router-dom'
import { Home, HomeLayout, NotFound, ProductPage,
	LoginPage, RegisterPage, Authentication } from '@pages'

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
					path: ':productSlug',
					element: <ProductPage />,
				},
				{
					path: 'id/:productId',
					element: <ProductPage />,
					
				}
			]
		},
		
		// auth
		{
			element: <HomeLayout />,
			children: [
				{
					element: <Authentication />,
					children: [
						{
							element: <LoginPage />,
							path: '/login'
						},
						{
							element: <RegisterPage />,
							path: '/register'
						},
					]
				}
			],
		},
		
		{
			element: <HomeLayout />,
			children: [
				{
					path: '*',
					element: <NotFound />
				}
			]
		}
		
		
    ])
}

