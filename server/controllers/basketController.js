import { basketService } from "#services";

import { logger } from "#config";

const { getBasket, addBasket, removeBasket, clearBasket, updateQuantity, mergeBasket } = basketService;


const GetToBasket = async (req, res) => {
	const user = req?.user
	
    try {	
		if(user?._id !== id) return res.status(403).json({status: false, message: "Yetkiniz yok"})

		const result = await getBasket(user?._id)
	
		if(!result.status) return res.status(400).json(result)
		
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - basketController/GetBasket]: ", err.message)
		logger.error("[ERROR - basketController/GetBasket]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const AddToBasket = async (req, res) => {
	const user = req?.user
	const { productId, quantity } = req.body
    
	try {

		if(user?._id !== id) return res.status(403).json({status: false, message: "Yetkiniz yok"})
		
		if(!productId) return res.status(400).json({status: false, message: "Ürün kimliği yok"})
		
		const result = await addBasket(user?._id, productId, quantity)
	
		if(!result.status) return res.status(400).json(result)
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - basketController/AddToBasket]: ", err.message)
		logger.error("[ERROR - basketController/AddToBasket]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const RemoveToBasket = async (req, res) => {
	const user = req?.user
	const { productId } = req.params
    
	try {

		if(user?._id !== id) return res.status(403).json({status: false, message: "Yetkiniz yok"})
		
		if(!productId) return res.status(400).json({status: false, message: "Ürün kimliği yok"})
		
		const result = await removeBasket(user?._id, productId)
			
		if(!result.status) return res.status(400).json(result)
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - basketController/RemoveToBasket]: ", err.message)
		logger.error("[ERROR - basketController/RemoveToBasket]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const ClearToBasket = async (req, res) => {
	const user = req?.user
    
	try {

		if(user?._id !== id) return res.status(403).json({status: false, message: "Yetkiniz yok"})
		
		const result = await clearBasket(user?._id)
		
		if(!result.status) return res.status(400).json(result)
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - basketController/clearToBasket]: ", err.message)
		logger.error("[ERROR - basketController/cleartToBasket]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const UpdateToBasket = async (req, res) => {
	const user = req?.user
	
	const { productId } = req.params
    const { quantity } = req.body
	
	try {

		if(user?._id !== id) return res.status(403).json({status: false, message: "Yetkiniz yok"})
		
		if(!productId || !quantity) return res.status(400).json({status: false, message: "Ürün kimliği veya miktar boş"})
		
		const result = await updateQuantity(user?._id, productId, quantity)
	
		if(!result.status) return res.status(400).json(result)
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - basketController/UpdateToBasket]: ", err.message)
		logger.error("[ERROR - basketController/UpdateToBasket]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const MergeToBasket = async (req, res) => {
	const user = req?.user
    const { items } = req.body
	try {

		if(user?._id !== id) return res.status(403).json({status: false, message: "Yetkiniz yok"})
		
		if(!items || items?.length===0) return res.status(400).json({status: false, message: "Ürünler kısmı boş"})
		
		const result = await mergeBasket(user?._id, items)
	
		if(!result.status) return res.status(400).json(result)
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - basketController/MergeToBasket]: ", err.message)
		logger.error("[ERROR - basketController/MergeToBasket]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}


export {
	GetToBasket,
	AddToBasket,
	RemoveToBasket,
	ClearToBasket,
	UpdateToBasket,
	MergeToBasket
}