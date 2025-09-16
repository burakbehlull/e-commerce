import { tokenService } from "#services"

const { verifyAccessToken } = tokenService

export default function authMiddleware(req, res, next){
	const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];
	
	const verify = verifyAccessToken(token)
	
	if(!verify) res.status(401).json({ status: false, message: "Geçersiz token" })
	if(verify.expired) res.status(401).json({ status: false, message: "Tokenin süresi dolmuş" })
	
	next()
}