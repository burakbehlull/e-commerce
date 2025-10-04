import { API, BASEAPI } from '@api';

BASEAPI.interceptors.request.use(config=> {
	const token = null;
    config.headers.Authorization = `Bearer ${token}` 
    return config
})

const authAPI = {
    register: (data) => API.post('/auth/register', data), // username, password, email, phone, (globalName, address, role)
    login: (data) => API.post('/auth/login', data), // username, email, password
    refresh: (data) => API.post('/auth/refresh', data),
}

const userAPI = {
    me: (data) => API.post('/users/me', data),
    update: (id) => API.put(`/users/${id}`, data),
    delete: (id) => API.delete(`/users/${id}`, data),
	
    logout: (id) => API.post(`/users/${id}/logout`, data)
}

const basketAPI = {
    getBasket: (data) => API.get('/basket', data),
    addBasket: (data) => API.post('/basket', data), // productId, quantity
    updateBasket: (productId, data) => API.patch(`/basket/${productId}`, data), // quantity
    removeBasket: (productId) => API.delete(`/basket/${productId}`), // productId
    clear: () => API.delete('/basket/clear'),
	merge: (data) => API.post('/basket/merge') // items
}

const categoryAPI = {
	getCategories: ()=> API.get('/category/all'),
	getCategory: (queries)=> API.get('/category', queries), // name, limit, page
	createCategory: (data)=> API.post('/category', data), // name, description
    updateCategory: (id, data) => API.put(`/category/${id}`, data), // name, description
    removeCategory: (id) => API.delete(`/category/${id}`),
}

const productAPI = {
	getProducts: (queries)=> API.get('/products/', queries), // page, limit
	createProduct: (data)=> API.post('/products/', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}), /* 
		name, description, price, brand, stock, isActive, thumbnail,
		images, categoryId 
	*/

	getProductById: (productId)=> API.get(`/products/id/${productId}`),
	getProductBySlug: (productSlug)=> API.get(`/products/${productSlug}`),
	updateProductById: (productId, data)=> API.put(`/products/${productId}`, data),
	removeProductById: (productId)=> API.delete(`/products/${productId}`),

	addImageToProduct: (productId)=> API.post(`/products/${productId}/images`, {}, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}), // images
	updateThumbnailToProduct: (productId)=> API.put(`/products/${productId}/thumbnail`, {}, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}), // thumbnail
	removeImageToProduct: (productId, data)=> API.delete(`/products/${productId}/image`, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}, data), // imagePath
	
	getImage: async (productId, index) => {
		const response = await API.get(`/products/${productId}/image`, {
			index
		}, {
		  responseType: 'blob',
		});
		return response;
	 },

	addProductToCategory: (productId, categoryId)=> API.post(`/products/${productId}/${categoryId}`),
	removeProductToCategory: (productId, categoryId)=> API.delete(`/products/${productId}/${categoryId}`),

}
	
export {
	authAPI,
	userAPI,
	basketAPI,
	categoryAPI,
	productAPI
}

