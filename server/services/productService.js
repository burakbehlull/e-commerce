import { Product } from "#models";

function addProduct(data={name, description, price, 
		category, brand, stock, thumbnail, isActive}){
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
}

export {
	addProduct
};