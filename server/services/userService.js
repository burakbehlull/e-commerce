import mongoose from "mongoose"
import { User } from "#models"

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
			message: "Kullanıcı getirildi!",
			data: user,
		}
	} catch(err) {
		console.error("[ERROR - userService/deleteUser]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
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
		console.error("[ERROR - userService/createUser]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
		
	}
}

async function updateUserById({id, username, password, email, phone, address}){
	try {
		const user = await User.findById(id)
		
		if(!user) return {
			status: false,
			message: "Kullanıcı mevcut değil",
		}
		
		if(username) user.username = username
		if(password) user.password = password
		if(email) user.email = email
		if(phone) user.phone = phone
		if(address) user.address = address
		
		await user.save()
		
		const updatedUser = await User.findById(id)
		
		return {
			status: true,
			message: "Kullanıcı güncellendi",
			data: updatedUser
		}
	} catch(err) {
		console.error("[ERROR - userService/deleteUser]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
}

async function deleteUser(userId){
	try {
		const user = await User.findById(userId)
		
		if(!user) return {
			status: false,
			message: "Kullanıcı mevcut değil",
		}
		
		const deletedUser = await User.findByIdAndDelete(userId);
		
		return {
			status: true,
			message: "Kullanıcı silindi!",
			data: deletedUser,
		}
	} catch(err) {
		console.error("[ERROR - userService/deleteUser]: ", err.message)
		return {
			status: false,
			error: err,
			message: err.message
		}
	}
}

async function getUserInfo({id, username, email}){
	const result = await getUser({id, username, email})
	const user = result.data
	return result
}

export {
	getUser,
	createUser,
	updateUserById,
	deleteUser,
	
	// e
	getUserInfo
}



