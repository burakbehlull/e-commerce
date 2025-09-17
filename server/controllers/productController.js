import { productService } from "#services";

const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = productService;

import fs from "fs";
import path from "path"

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
  const data = req.body;
  try {
    if (!data) return res.status(204).json({ status: false, message: "İstek boş" });

    if (!req.files || !req.files["thumbnail"] || req.files["thumbnail"].length === 0) {
      return res.status(400).json({ message: "Thumbnail zorunlu" });
    }

    const tempThumbnail = req.files["thumbnail"][0].path;
    const tempImages = req.files["images"] ? req.files["images"].map(f => f.path) : [];

    const result = await addProduct({
      ...data,
      thumbnail: "temp",
      images: []
    });

	// image uploads
    const productDir = path.join("uploads", "products", result.data.slug);
    if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });

	const thumbExt = path.extname(tempThumbnail);
	const thumbnailPath = path.join(productDir, "thumbnail" + thumbExt);
	fs.renameSync(tempThumbnail, thumbnailPath);

    const imagesPaths = tempImages.map((img, idx) => {
      const ext = path.extname(img);
      const newPath = path.join(productDir, `image${idx + 1}${ext}`);
      fs.renameSync(img, newPath);
      return newPath;
    });

    result.thumbnail = thumbnailPath;
    result.images = imagesPaths;
    await result.data.save();

    return res.status(200).json(result);

  } catch (err) {
    console.error("[ERROR - productController/CreateProduct]: ", err);
    return res.status(500).json({ status: false, error: err, message: err.message });
  }
};

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