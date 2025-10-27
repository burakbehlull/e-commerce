import fs from "fs";
import path from "path"

import { Product } from "#models";

async function getProducts({ page = 1, limit = 10 } = {}) {
    try {
        page = parseInt(page);
        limit = parseInt(limit);

        const totalItems = await Product.countDocuments();

        const products = await Product.find({})
        .skip((page - 1) * limit)
        .limit(limit);

        return {
			status: true,
			message: 'Ürünler çekildi',
            products,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            page,
            limit,
        };
    } catch (error) {
        console.error("[ERROR - productService/getProducts]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
    }
};

async function addProduct(data, tempThumbnail, tempImages){
	try {
		if(!data) return { 
			status: false,
			message: "Veri Boş"
		}
		
		const product = await Product.create(data)
		
		if(!product) return { 
			status: false,
			message: "Ürün oluşturalamadı",
			error: product,
		}
		
		const productDir = path.join("uploads", "products", product.slug);
		if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });
		
		// Thumbnail
		const thumbExt = path.extname(tempThumbnail);
		const thumbnailPath = path.join("products", product.slug, "thumbnail" + thumbExt);
		fs.renameSync(tempThumbnail, path.join("uploads", thumbnailPath));
		product.thumbnail = thumbnailPath.replace(/\\/g, "/");

		// Images
		const imagesPaths = tempImages.map((img, idx) => {
		  const ext = path.extname(img);
		  const newPath = path.join("products", product.slug, `image${idx + 1}${ext}`);
		  fs.renameSync(img, path.join("uploads", newPath));
		  return newPath.replace(/\\/g, "/");
		});

		product.images = imagesPaths;
		await product.save();
		
		return { 
			status: true,
			message: "Ürün oluşturuldu",
			data: product,
		}
	} catch(err) {
		console.error("[ERROR - productService/addProduct]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
}

async function getProductById(id){
	try {
		if(!id) return { 
			status: false,
			message: "Eksik istek"
		}
		
		const product = await Product.findOne({id})
		if(!product) return {
			status: false,
			message: "Ürün mevcut değil",
		}
		return {
			status: true,
			message: "Ürün bilgileri çekildi",
			data: product
		}
	} catch(err) {
		console.error("[ERROR - productService/getProductById]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
	
}

async function getProductBySlug(slug){
	try {
		if(!slug) return { 
			status: false,
			message: "Eksik istek"
		}
		
		const product = await Product.findOne({slug: slug})
		if(!product) return {
			status: false,
			message: "Ürün mevcut değil",
		}
		return {
			status: true,
			message: "Ürün bilgileri çekildi",
			data: product
		}
	} catch(err) {
		console.error("[ERROR - productService/getProductBySlug]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
	
}

async function updateProduct(id, data){
	try {
		if(!id || !data) return { 
			status: false,
			message: "Eksik istek"
		}
		const product = await Product.findOne({id})
		if(!product) return {
			status: false,
			message: "Ürün mevcut değil",
		}
		
		const updatedProduct = await Product.findOneAndUpdate({id}, { $set: data }, { new: true, runValidators: true })
		return {
			status: true,
			message: "Ürün güncellendi",
			data: updatedProduct
		}
	} catch(err) {
		console.error("[ERROR - productService/updateProduct]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
	
}

async function deleteProduct(id){
	try {
		if(!id) return { 
			status: false,
			message: "Eksik istek"
		}
		
		const product = await Product.findOne({id})
		
		if(!product) return {
			status: false,
			message: "Ürün mevcut değil",
		}
		
		if (product.thumbnail && fs.existsSync(product.thumbnail)) fs.unlinkSync(product.thumbnail);

		  // Resimleri sil
		 product.images.forEach(img => fs.existsSync(img) && fs.unlinkSync(img));
				
		const deletedProduct = await Product.findOneAndDelete({id});
		
		return {
			status: true,
			message: "Ürün silindi!",
			data: deletedProduct,
		}
	} catch(err) {
		console.error("[ERROR - productService/deleteProduct]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
}

async function updateThumbnail(id, req){
	try {
		const product = await Product.findOne({id: id});
	    if (!product) return {
			status: false,
			message: "Ürün bulunamadı"
		};
		
		const dir = path.join("uploads", "products", product.slug);
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

		const ext = path.extname(req.file.originalname);
		const newPath = path.join(dir, "thumbnail" + ext);

	    if (product.thumbnail) {
			const oldPath = path.join("uploads", product.thumbnail); 
			if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
		}

		fs.renameSync(req.file.path, newPath);

	    product.thumbnail = path.join("products", product.slug, "thumbnail" + ext);
	    await product.save();
	  
		return {
			status: true,
			message: "Thumbnail güncellendi",
			data: product
		};
	} catch(err) {
		console.error("[ERROR - productService/updateThumbnail]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
  
};

async function addImages(id, paths){
	try {
		const product = await Product.findById(id);
		if (!product) return {
			status: false,
			message: "Ürün bulunamadı"
		};

		product.images.push(...paths);
		await product.save();
		
		return {
			status: true,
			message: "Resim eklendi",
			data: product
		};
	} catch(err) {
		console.error("[ERROR - productService/addImages]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
  
};

async function deleteImage(id, imagePath) {
	try {
		const product = await Product.findById(id);
		if (!product) return {
			status: false,
			message: "Ürün bulunamadı"
		};

		product.images = product.images.filter(img => img !== imagePath);
		if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

		await product.save();
		
		return {
			status: true,
			message: "Resim silindi",
			data: product
		};
	} catch(err) {
		console.error("[ERROR - productService/deleteImage]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
  
};

async function addCategoryToProduct(productId, categoryId){
	
	try {
		if(!productId || !categoryId) return { 
			status: false,
			message: "Ürün veya kategori kimliği boş"
		}
		
		const product = await Product.findOne({id: productId});
		if (!product) return { status: false, message: "Ürün bulunamadı" }
		

		if (product.category.includes(categoryId)) return { status: false, message: "Kategori zaten üründe mevcut" }
		

		product.category.push(categoryId)
		await product.save()
		await product.populate("category")
		
		return { 
			status: true,
			message: "Ürüne kategori eklendi.",
			data: product,
		}
	} catch(err) {
		console.error("[ERROR - productService/addCategoryToProduct]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
}

async function removeCategoryFromProduct(productId, categoryId){
	
	try {
		if(!productId || !categoryId) return { 
			status: false,
			message: "Ürün veya kategori kimliği boş"
		}
		
		const exitsProduct = await Product.findOne({id: productId});
		if (!exitsProduct) return { status: false, message: "Ürün bulunamadı" }

		const product = await Product.findByIdAndUpdate(
			exitsProduct._id,
			{ $pull: { category: categoryId } },
			{ new: true }
		).populate("category");

		
		return { 
			status: true,
			message: "Üründen kategori silindi.",
			data: product,
		}
	} catch(err) {
		console.error("[ERROR - productService/removeCategoryFromProduct]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
}

async function getImage(productId, index){
	
	try {
		const product = await Product.findOne({id: productId});
		if (!product) return { status: false, message: "Ürün bulunamadı" }

		const imagePath = index ? product.images[index] : product.thumbnail;
		if (!imagePath) return { status: false, message: "Resim bulunamadı" }

		const absolutePath = path.join(process.cwd(), "uploads", imagePath.replace(/\//g, path.sep));

		return {
			status: true,
			data: absolutePath,
			message: "Resim çekimi başarılı"
		}
	} catch(err) {
		console.error("[ERROR - productService/getImage]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
}


export {
	getProducts,
	addProduct,
	getProductById,
	getProductBySlug,
	updateProduct,
	deleteProduct,
	
	updateThumbnail,
	addImages,
	getImage,
	deleteImage,
	
	addCategoryToProduct,
	removeCategoryFromProduct
};