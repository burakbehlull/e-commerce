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
		const product = await Product.findOne({id: productId});
		if (!product) return { status: false, message: "Ürün bulunamadı" };

		let basket = await Basket.findOne({ user: userId });
		if (!basket) basket = new Basket({ user: userId, items: [] });

		const itemIndex = basket.items.findIndex(i => i.product.toString() === product._id.toString());

		if (itemIndex > -1) {
		  return {
			status: false,
			message: "Bu ürün zaten sepete eklenmiş",
			data: await basket.populate("items.product"),
		  };
		} else {
		  basket.items.push({ product: product._id, quantity });
		}

		await basket.save();
		const itemsProduct = await basket.populate("items.product");

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

async function removeBasket(userId, productId){
	try {
		const product = await Product.findOne({id: productId});
		if (!product) return { status: false, message: "Ürün bulunamadı" };
		
		const basket = await Basket.findOne({ user: userId }).populate("items.product");
	
		let basket = await Basket.findOne({ user: userId });
		if (!basket) return { status: false, message: "Sepet yok" };

		basket.items = basket.items.filter(i => i.product.toString() !== product._id);

		await basket.save();
		const itemsProduct = await basket.populate("items.product")
		
		return {
			status: true,
			message: "Ürün sepetten silindi",
			data: itemsProduct,
		}
	} catch(err) {
		console.error("[ERROR - basketService/removeBasket]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}

async function clearBasket(userId){
	try {
		
		const basket = await Basket.findOneAndUpdate({ user: userId }, { items: [] })
		
		if(basket?.items?.length === 0) return {
			status: true,
			message: "Sepet temiz",
			data: basket
		}
		
		return {
			status: true,
			message: "Sepet temizlendi",
			data: basket,
		}
	} catch(err) {
		console.error("[ERROR - basketService/clearBasket]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}

async function mergeBasket(userId, items){
	try {
		
	    let basket = await Basket.findOne({ user: userId });

	    if (!basket) basket = new Basket({ user: userId, items: [] });

	    items.forEach(({ product, quantity }) => {
			const getProduct = await Product.findOne({ id: product });
			
			const itemIndex = basket.items.findIndex(i => i.product.toString() === getProduct._id);
			if (itemIndex > -1) {
				basket.items[itemIndex].quantity += quantity;
			} else {
				basket.items.push({ product: getProduct._id, quantity });
			}
		});

	    await basket.save();
		const itemsProduct = await basket.populate("items.product")
			
	    return {
			status: true,
			message: "Sepet birleştirildi",
			data: itemsProduct,
		}
	} catch(err) {
		console.error("[ERROR - basketService/mergeBasket]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}

async function updateQuantity(userId, productId, quantity){
	try {
		
		if (!productId || quantity < 1) return { status: false, message: "Geçersiz istek" }
		

		let basket = await Basket.findOne({ user: userId })
		if (!basket) { status: false, message: "Sepet bulunamadı" }
		
		const product = Product.findOne({id: productId})
		
		const itemIndex = basket.items.findIndex(i => i.product.toString() === product._id);
		if (itemIndex === -1) return { status: false, message: "Ürün sepette yok" }
		

		basket.items[itemIndex].quantity = quantity;

		await basket.save();
		const itemsProduct = await basket.populate("items.product"));
		
		return {
			status: true,
			message: "Ürün sayısı güncellendi",
			data: itemsProduct,
		}
	} catch(err) {
		console.error("[ERROR - basketService/updateQuantity]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}

export {
	getBasket,
	addBasket,
	removeBasket,
	clearBasket,
	mergeBasket,
	updateQuantity
};