import { authService, tokenService } from "#services";

import { logger } from "#config";

const { register, login, refreshToAccessToken } = authService;
const { verifyAccessToken } = tokenService;

const UserRegister = async (req, res) => {
	const data = req.body
	
	const authHeader = req?.headers["authorization"]
    const token = authHeader && authHeader?.split(" ")[1];
	
	const verify = verifyAccessToken(token)
	
	let verifyRole = "customer";
	if (verify?.role === "admin") verifyRole = data.role;
	
    try {
		if(!data) return res.status(400).json({status: false, message: "İstek boş"})
		
		const result = await register({...data, role: verifyRole})
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - userController/Register]: ", err.message)
		logger.error("[ERROR - userController/Register]: ", err.message)
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
		if(!data) return res.status(400).json({status: false, message: "İstek boş"})
		
		const result = await login(data)
	
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - userController/Login]: ", err.message)
		logger.error("[ERROR - userController/Login]: ", err.message)
		return res.status(500).json({
			status: false,
			error: err,
			message: err.message
		})
	}
}

const RefreshAccessToken = async (req, res)=> {
	
	const { token } = req.body
	
    try {
		
		if(!token) return res.status(400).json({status: false, message: "Token boş"})
		
		const result = await refreshToAccessToken(token)
	
		if(!result) return res.status(400).json({status: false, message: "Boş içerik"})
			
		return res.status(200).json(result)
	} catch(err){
		console.error("[ERROR - authController/RefreshAccessToken]: ", err.message)
		logger.error("[ERROR - userController/RefreshAccessToken]: ", err.message)
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