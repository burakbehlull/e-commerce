import mongoose from "mongoose"
import { User } from "@models"

async function getUser({id, username, email}){
	try {
		const isUserId = mongoose.Types.ObjectId.isValid(id) ? id : null
		
		const user = await User.findOne({
		  $or: [
			{ _id: isUserId }, 
			{ username: username }, 
			{ email: email }
		  ]
		})
		
		if(!user) return {
			status: false,
			message: "Kullanıcı mevcut değil",
		}
		
		return {
			status: true,
			message: "Kullanıcı silindi!",
			data: user,
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


async function updateUser(){}

async function deleteUser({ username, email }){
	try {
		const user = await User.findOne({
		  $or: [
			{ username: username }, 
			{ email: email }
		  ]
		})
		
		if(!user) return {
			status: false,
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


export {
	getUser,
	createUser,
	// update action,
	deleteUser
}



