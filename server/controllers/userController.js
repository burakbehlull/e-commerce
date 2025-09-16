import { authService, userService } from "#services";

const { updateUserById, deleteUser, getUserInfo } = userService;


const UserInfo = async (req, res) => {
	const data = req.body
	const user = req.user
	
    try {
		
		if(!(user._id === data._id 
			|| user.username === data.username 
			|| user.email === data.email)) return res.status(403).json({status: false, message: "Yetkiniz yok"})
		
		if(!data) return res.status(204).json({status: false, message: "İstek boş"})
		
		const result = await getUserInfo(data)
	
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - userController/UserInfo]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const UpdateUser = async (req, res) => {
	const data = req.body
	const id = req.params.id
	
    try {
		if(!(req?.user?._id === id)) return res.status(403).json({status: false, message: "Yetkiniz yok"})
		
		if(!data) return res.status(204).json({status: false, message: "İstek boş"})
		
		const result = await updateUserById({id, ...data})
	
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		if(!result.status) return res.status(204).json(result)
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - userController/UpdateUser]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const DeleteToUser = async (req, res) => {
	const id = req.params.id
	
    try {
		if(!(req?.user?._id === id)) return res.status(403).json({status: false, message: "Yetkiniz yok"})

		if(!id) return res.status(204).json({status: false, message: "Boş kimlik"})
		
		const result = await deleteUser(id)
	
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		if(!result.status) return res.status(204).json(result)
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - userController/UpdateUser]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

export {
	UserInfo,
	UpdateUser,
	DeleteToUser
}