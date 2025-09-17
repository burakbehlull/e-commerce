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

async function addProduct(data){
	try {
		if(!data) return { 
			status: false,
			message: "Veri Boş"
		}
		
		const createdProduct = await Product.create(data)
		
		return { 
			status: true,
			message: "Ürün oluşturuldu",
			data: createdProduct,
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
		console.error("[ERROR - productService/getProduct]: ", err.message)
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

// Thumbnail güncelle
async function updateThumbnail(id, newPath){
	try {
		const product = await Product.findById(id);
	    if (!product) return {
			status: false,
			message: "Ürün bulunamadı"
		};

	    if (product.thumbnail && fs.existsSync(product.thumbnail)) fs.unlinkSync(product.thumbnail);
	    product.thumbnail = newPath;
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

// Resimleri ekle
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

// Tek resimi sil
async function deleteImage(id, imagePath) => {
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

export {
	getProducts,
	addProduct,
	getProductById,
	updateProduct,
	deleteProduct
};