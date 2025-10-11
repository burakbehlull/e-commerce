import { useRoutes } from 'react-router-dom'
import { Home, HomeLayout, NotFound, ProductPage, 
	Authentication, MyAccount, AccountLayout, AddressBook, Basket } from '@pages'

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
			element: <Authentication />,
			children: [
				{
					element: <HomeLayout />,
					children: [
						{
							path: '/account',
							element: <AccountLayout />,
							children: [
								{
									path: '',
									element: <MyAccount />
								},
								{
									path: 'address',
									element: <AddressBook />
								}
							]
						},
						{
							path: '/basket',
							element: <Basket />
						}
					]
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

