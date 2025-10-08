import { useRoutes } from 'react-router-dom'
import { Home, HomeLayout, NotFound, ProductPage, Authentication } from '@pages'

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

