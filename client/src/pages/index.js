import Layout from './layouts/Layout'
import HomeLayout from './layouts/HomeLayout'
import AccountLayout from './layouts/AccountLayout'
import AdminLayout from "./layouts/AdminLayout"


import NotFound from './partials/NotFound'

import Home from './Home'
import ProductPage from './ProductPage'


import Authentication from './auth/Authentication'
import AdminAuthentication from './auth/AdminAuthentication'

import MyAccount from './account/MyAccount'
import AccountSidebar from './account/AccountSidebar'
import AddressBook from './account/AddressBook'

import AdminSidebar from './admin/AdminSidebar'


import Basket from "./Basket"

import BillingPage from "./BillingPage"
import Products from "./admin/Products"


export {
	Layout,
	HomeLayout,
	
	NotFound,
	
	Home,
	ProductPage,
	
	// account pages
	AccountLayout,
	MyAccount,
	AccountSidebar,
	AddressBook,
	
	// auth pages,
	Authentication,
	AdminAuthentication,
	
	
	Basket,
	
	BillingPage,
	
	//admin
	AdminLayout,
	
	AdminSidebar,
	
	Products
}