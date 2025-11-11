import { useRoutes } from 'react-router-dom'
import { Home, HomeLayout, NotFound, ProductPage, AdminAuthentication, Authentication, 
	MyAccount, AccountLayout, AddressBook, Basket, BillingPage, AdminLayout, 
	Products, ProductAddScreen, About } from '@pages'

export default function Routes(){

    return useRoutes([
		{
			element: <HomeLayout />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/about',
					element: <About />
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
							path: '/cart',
							element: <Basket />
						},
						{
							path: '/billing',
							element: <BillingPage />
						}
					]
				}
			]
		},
		
		// admin
		{
		
			element: <AdminAuthentication />,
			children: [
				{
					element: <HomeLayout />,
					children: [
						{
							path: '/admin',
							element: <AdminLayout />,
							children: [
								{
									path: 'products',
									element: <Products />
								},
								{
									path: 'products/create',
									element: <ProductAddScreen />
								}
							]
						},
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

