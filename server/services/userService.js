import { User } from "@models"

async function createUser({ globalName, username, password, email, phone, address, token }){
	try {
		
		const user = await User.findOne({
		  $or: [
			{ username: username }, 
			{ email: email }
		  ]
		})
		
		if(user) return {
			status: false,
			message: "Zaten e-posta veya kullanıcı adı var!"
		}
		
		const createdUser = await User.create({ globalName, username, password, email, phone, address, token })
		
		return {
			status: true,
			message: "Kullanıcı yaratıldı",
			data: createdUser,
		}
	} catch(err) {
		return {
			status: false,
			error: error,
			message: error.message
		}
		console.error("[ERROR - userService/createUser]: ", err.message)
	}
}


// update action

async function deleteUser({ username, email }){
	try {
		const user = await User.findOne({
		  $or: [
			{ username: username }, 
			{ email: email }
		  ]
		})
		
		if(!user) return {
			status: true,
			message: "Kullanıcı mevcut değil",
		}
		
		const userId = user._id
		
		const deletedUser = await User.findByIdAndDelete(userId);
		
		return {
			status: true,
			message: "Kullanıcı silindi!",
			data: deletedUser,
		}
	} catch(err) {
		return {
			status: false,
			error: error,
			message: error.message
		}
		console.error("[ERROR - userService/deleteUser]: ", err.message)
	}
}