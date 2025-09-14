import { authService } from "#services";

const { register } = authService;

const UserRegister = async (req, res) => {
	const data = req.body
    try {
		const result = await UserRegister(data)
		if(!result) res.status(204).json({success: false, message: "Boş içerik"})
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