import { Basket, Product } from "#models";

async function getBasket(userId){
	try {
		
		const basket = await Basket.findOne({ user: userId }).populate("items.product");
		
		if(basket?.items?.length === 0) return {
			status: false,
			message: "Sepette ürün yok",
			data: { items: [] }
		}
		
		return {
			status: true,
			message: "Sepet getirildi",
			data: basket,
		}
	} catch(err) {
		console.error("[ERROR - basketService/getBasket]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}

async function addBasket(userId, productId, quantity = 1){
	try {
		const product = await Product.findById(productId);
		if (!product) return { status: false, message: "Ürün bulunamadı" };
		

		let cart = await Cart.findOne({ user: userId });
		if (!cart) cart = new Cart({ user: userId, items: [] });

		const itemIndex = cart.items.findIndex(i => i.product.toString() === product._id.toString());

		if (itemIndex > -1) {
		  return {
			status: false,
			message: "Bu ürün zaten sepete eklenmiş",
			data: await cart.populate("items.product"),
		  };
		} else {
		  cart.items.push({ product: product._id, quantity });
		}

		await cart.save();
		const itemsProduct = await cart.populate("items.product");

		return {
		  status: true,
		  message: "Ürün sepete eklendi",
		  data: itemsProduct,
		}
	} catch(err) {
		console.error("[ERROR - basketService/addBasket]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}


export {
	getBasket,
	addBasket
};