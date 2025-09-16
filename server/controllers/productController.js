import { productService } from "#services";

const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = productService;

const GetProducts = async (req, res) => {
	const data = req.body
    try {		
		const result = await getProducts(data)
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/GetProducts]: ", err.message)
		
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const CreateProduct = async (req, res) => {
	const data = req.body
    try {
		if(!data) return res.status(204).json({status: false, message: "İstek boş"})
		const result = await addProduct(data)
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/CreateProduct]: ", err.message)
		
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const FindProductById = async (req, res) => {
	const { id } = req.params
    try {
		if(!id) return res.status(204).json({status: false, message: "Ürün kimliği boş"})
		
		const result = await getProductById(id)
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/FindProductById]: ", err.message)
		
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const UpdateProduct = async (req, res) => {
	const { id } = req.params
	const data = req.body
	
    try {
		if(!id) return res.status(204).json({status: false, message: "Ürün kimliği boş"})

		if(!data) return res.status(204).json({status: false, message: "İstek boş"})
		
		const result = await updateProduct(id, data)
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/UpdateProductById]: ", err.message)
		
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const DeleteProduct = async (req, res) => {
	const { id } = req.params
	
    try {
		if(!id) return res.status(204).json({status: false, message: "Ürün kimliği boş"})
			
		const result = await deleteProduct(id)
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/UpdateProductById]: ", err.message)
		
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

export {
	GetProducts,
	CreateProduct,
	
	FindProductById,
	UpdateProduct,
	DeleteProduct
}