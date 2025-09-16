import { authService, userService } from "#services";

const { register, login, refreshToAccessToken, getUserInfo } = authService;
const { updateUserById, deleteUser } = userService;

const UserRegister = async (req, res) => {
	const data = req.body
    try {
		if(!data) return res.status(204).json({status: false, message: "İstek boş"})
		
		const result = await register(data)
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - userController/Register]: ", err.message)
		
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const UserLogin = async (req, res) => {
	const data = req.body
    try {
		if(!data) return res.status(204).json({status: false, message: "İstek boş"})
		
		const result = await login(data)
	
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - userController/Login]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const RefreshAccessToken = async (req, res)=> {
	const data = req.body
    try {
		if(!data) return res.status(204).json({status: false, message: "İstek boş"})
		
		const result = await refreshToAccessToken(data)
	
		if(!result) return res.status(204).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - userController/Login]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const UserInfo = async (req, res) => {
	const data = req.body
    try {
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
	UserRegister,
	UserLogin,
	RefreshAccessToken,
	UserInfo,
	UpdateUser,
	DeleteToUser
}