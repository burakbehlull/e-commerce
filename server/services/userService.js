import { User } from "@models"

async function createUser({ globalName, username, password, email, phone, address, token }){
	try {
		
		const user = await User.findOne({
		  $or: [
			{ name: username }, 
			{ email: email }
		  ]
		});
		
		if(user) return {
			status: false,
			message: "Zaten e-posta veya kullanıcı adı var!"
		}
		
		const createdUser = await User.create({ globalName, username, password, email, phone, address, token })
		
		return {
			status: true,
			message: "Kullanıcı yaratıldı!",
			data: createdUser,
		}
	} catch(err) {
		return {
			status: false,
			error: error,
			message: error.message
		}
		console.error("[ERROR]: ", err.message)
	}
}
