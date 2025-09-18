import { tokenService } from "#services"

const { verifyAccessToken } = tokenService

export default function adminAuthMiddleware(req, res, next){
	const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];
	
	const verify = verifyAccessToken(token)
	
	if(!verify) return res.status(401).json({ status: false, message: "Geçersiz token" })
	if(verify?.expired) return res.status(401).json({ status: false, message: "Tokenin süresi dolmuş" })
	if(verify?.role !== "admin") return res.status(401).json({ status: false, message: "Yönetici yetkiniz yok" })
	
	req.user = verify
	
	next()
}