import { categoryService } from "#services";
import { logger } from "#config";

const { getCategories, getCategory, createCategory, updateCategory } = categoryService;


const GetToCategories = async (req, res) => {
	
    try {
		const result = await getCategories()
	
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - categoryController/GetToCategories]: ", err.message)
		logger.error("[ERROR - categoryController/GetToCategories]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const GetToCategoryByName = async (req, res) => {
	const { name, limit, page } = req.query
    try {
		if(!req?.query) return res.status(400).json({status: false, message: "İstek boş"})
		
		const result = await getCategory({name, limit, page})
	
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - categoryController/GetToCategoryByName]: ", err.message)
		logger.error("[ERROR - categoryController/GetToCategoryByName]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const CreateToCategory = async (req, res) => {
	const data = req.body
    try {
		if(!data) return res.status(400).json({status: false, message: "İstek boş"})
		
		const result = await createCategory(data)
	
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - categoryController/CreateToCategory]: ", err.message)
		logger.error("[ERROR - categoryController/CreateToCategory]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const UpdateToCategoy = async (req, res) => {
	const data = req.body
    try {
		if(!data) return res.status(400).json({status: false, message: "İstek boş"})
		
		const result = await updateCategory(data.id, {
			name: data.name,
			description: data.description
		})
	
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - categoryController/UpdateToCategory]: ", err.message)
		logger.error("[ERROR - categoryController/UpdateToCategory]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const DeleteToCategory = async (req, res) => {
	const{ id } = req.body
    try {
		if(!id) return res.status(400).json({status: false, message: "İstek boş"})
		
		const result = await deleteCategory(id)
	
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - categoryController/DeleteToCategory]: ", err.message)
		logger.error("[ERROR - categoryController/DeleteToCategory]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

export {
	GetToCategories,
	GetToCategoryByName,
	CreateToCategory,
	UpdateToCategoy,
	DeleteToCategory
	
}