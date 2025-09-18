import { Category, Product } from "#models";

async function getCategories(){
	try {
		
		const categories = await Category.find({})
		
		if(categories?.length === 0) return {
			status: false,
			message: "Mevcut kategori yok"
		}
		return {
			status: true,
			message: "Kategori yaratıldı",
			data: categories,
		}
	} catch(err) {
		console.error("[ERROR - categoryService/getCategories]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}

async function getCategory({ slug=null, page = 1, limit = 10 } = {}) {
    try {
        page = parseInt(page);
        limit = parseInt(limit);
		
		const category = await Category.findOne({ slug });
		if (!category) return { status: false, message: "Kategori bulunamadı" };
		
        const products = await Product.find({ category: category._id })
		.populate("category")
        .skip((page - 1) * limit)
        .limit(limit);
		
        const totalItems = await Product.countDocuments({ category: category._id });
		

        return {
            products,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            page,
            limit,
        };
    } catch (error) {
        console.error("[ERROR - categoryService/getCategory]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
    }
};

async function createCategory({ name, description }){
	try {
		
		const category = await Category.findOne({name})
		
		if(category) return {
			status: false,
			message: "Zaten bu kategori mevcut!"
		}
		
		const createdCategory = await Category.create({name, description})
		
		return {
			status: true,
			message: "Kategori yaratıldı",
			data: createdCategory,
		}
	} catch(err) {
		console.error("[ERROR - categoryService/createCategory]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}

async function updateCategory(id, { name, description }){
	try {
		
		const category = await Category.findById(id)
		if(!category) return {
			status: false,
			message: "Zaten bu kategori mevcut!"
		}
		
		if(name) category.name = name
		if(description) category.description = description
		
		await category.save()
		
		return {
			status: true,
			message: "Kategori yaratıldı",
			data: createdCategory,
		}
	} catch(err) {
		console.error("[ERROR - categoryService/updateCategory]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}

async function deleteCategory(id){
	try {
		const category = await Category.findById(id)
		
		if(!category) return {
			status: false,
			message: "Kategori mevcut değil",
		}
		
		const deletedCategory = await Category.findOneAndDelete(id);
		
		return {
			status: true,
			message: "Kategori silindi!",
			data: deletedUser,
		}
	} catch(err) {
		console.error("[ERROR - categoryService/deleteCategory]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
}


export {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory
};