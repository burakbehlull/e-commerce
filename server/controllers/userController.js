import { authService } from "#services";

const { register, login, refreshToAccessToken } = authService;

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

export {
	UserRegister,
	UserLogin,
	RefreshAccessToken
}