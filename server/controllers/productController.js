import fs from 'fs'
import path from 'path'

import { productService } from "#services";
import { logger } from "#config";

const { addProduct, getProducts, getProductById, updateProduct, deleteProduct, 
	updateThumbnail, addImages, addCategoryToProduct, removeCategoryFromProduct, getImage } = productService;

const GetProducts = async (req, res) => {
	const { page, limit } = req.query
	
    try {		
		const result = await getProducts({page, limit})
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/GetProducts]: ", err.message)
		logger.error("[ERROR - productController/GetProducts]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}
const CreateProduct = async (req, res) => {
  const data = req.body;

  try {
    if (!req.files || !req.files["thumbnail"] || req.files["thumbnail"].length === 0) {
      return res.status(400).json({ message: "Thumbnail zorunlu" });
    }

    const tempThumbnail = req.files["thumbnail"][0].path;
    const tempImages = req.files["images"] ? req.files["images"].map(f => f.path) : [];

    const result = await addProduct({
      ...data,
      thumbnail: "temp",
      images: []
    }, tempThumbnail, tempImages);
	
	if(!result.status) return res.status(400).json(result);

    return res.status(200).json(result);

  } catch (err) {
    console.error("[ERROR - CreateProduct]: ", err);
    return res.status(500).json({ status: false, error: err.message });
  }
};

const FindProductById = async (req, res) => {
	const { id } = req.params
    try {
		if(!id) return res.status(400).json({status: false, message: "Ürün kimliği boş"})
		
		const result = await getProductById(id)
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/FindProductById]: ", err.message)
		logger.error("[ERROR - productController/FindProductById]: ", err.message)
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
		if(!id) return res.status(400).json({status: false, message: "Ürün kimliği boş"})

		if(!data) return res.status(400).json({status: false, message: "İstek boş"})
		
		const result = await updateProduct(id, data)
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/UpdateProductById]: ", err.message)
		logger.error("[ERROR - productController/UpdateProductById]: ", err.message)
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
		if(!id) return res.status(400).json({status: false, message: "Ürün kimliği boş"})
			
		const result = await deleteProduct(id)
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/DeleteProduct]: ", err.message)
		logger.error("[ERROR - productController/DeleteProduct]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const UpdateToThumbnail = async (req, res) => {
	
  try {
	const { id }= req.params
    if (!req.file) return res.status(400).json({ status: false, message: "Thumbnail alanı zorunlu" });
    
	if(!id) return res.status(400).json({status: false, message: "Ürün kimliği boş"})
	
    const result = await updateThumbnail(id, req);
	if(!result.status) res.status(400).json(result);

    return res.status(200).json(result)

  } catch (err) {
		console.error("[ERROR - productController/UpdateThumbnail]: ", err.message)
		logger.error("[ERROR - productController/UpdateThumbnail]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
  }
};

const AddToImages = async (req, res) => {
	try {
		
		const { id } = req.params;
		
		if (!req.files || req.files.length === 0) return res.status(400).json({ status: false, message: "Resim seçilmemiş" });
		if (!id) return res.status(400).json({ status: false, message: "Ürün kimliği boş" });

		const product = await getProductById(id);
		if (!product.status) return res.status(404).json(product);

		const dir = path.join("uploads", "products", product.data.slug);
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

		const imagesPaths = req.files.map((file, idx) => {
		  const ext = path.extname(file.originalname);
		  const fileName = `image${product.data.images.length + idx + 1}${ext}`;
		  const newPath = path.join(dir, fileName);

		  fs.renameSync(file.path, newPath);

		  return path.join("products", product.data.slug, fileName).replace(/\\/g, "/");
		});

		const result = await addImages(product.data._id, imagesPaths);

		return res.status(200).json(result);
	  } catch (err) {
		console.error("[ERROR - productController/AddToImages]: ", err.message);
		logger.error("[ERROR - productController/AddToImages]: ", err.message);
		return res.status(500).json({
		  status: false,
		  error: err,
		  message: err.message
		});
	}
};

const DeleteToImage = async (req, res) => {
  try {
    const { imagePath } = req.body;
    if (!imagePath) return res.status(400).json({ message: "imagePath zorunlu" });
	
	const id = req.params.id
	if(!id) return res.status(400).json({status: false, message: "Ürün kimliği boş"})
	

    const product = await getProductById(id);
    if (!product.status) return res.status(404).json(product)

    const result = await deleteImage(product.data._id, imagePath);
    return res.status(200).json(result)
	
  } catch (err) {
		console.error("[ERROR - productController/deleteToImage]: ", err.message)
		logger.error("[ERROR - productController/DeleteToImage]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
  }
};

const AddCategoryProduct = async (req, res) => {
	const { id, categoryId } = req.params
	
    try {		
		const result = await addCategoryToProduct(id, categoryId)
		
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
		if(!result.status) return res.status(400).json(result)
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/AddCategoryProduct]: ", err.message)
		logger.error("[ERROR - productController/AddCategoryProduct]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const RemoveCategoryProduct = async (req, res) => {
	
	const { id, categoryId } = req.params
	
    try {		
		const result = await removeCategoryFromProduct(id, categoryId)
		
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
		if(!result.status) return res.status(400).json(result)
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - productController/removeCategoryFromProduct]: ", err.message)
		logger.error("[ERROR - productController/removeCategoryFromProduct]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const GetImage = async (req, res) => {
	
	const { id } = req.params
	const { index } = req.query
	
    try {		
		const result = await getImage(id, index)
		
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
		if(!result.status) return res.status(400).json(result)
			
		return res.status(200).sendFile(result.data)
	} catch(err){
		console.error("[ERROR - productController/GetImage]: ", err.message)
		logger.error("[ERROR - productController/GetImage]: ", err.message)
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
	DeleteProduct,
	
	UpdateToThumbnail,
	AddToImages,
	GetImage,
	DeleteToImage,
	
	AddCategoryProduct,
	RemoveCategoryProduct
}