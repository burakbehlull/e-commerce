import { createUser, getUser } from "./userService.js"
import { isHash, isMatch } from "#helpers"
import { generateRefreshToken, generateAccessToken, 
	generateAccessTokenFromVerifyRefreshToken, verifyAccessToken } from "./tokenService.js"

async function register(data){
	if(!data) return null
	const generatedRefreshToken = generateRefreshToken({email: data.email, username: data.username})
	const hashedPassword = await isHash(data.password)
	
	const result = await createUser({...data, password: hashedPassword, token: generatedRefreshToken})
	if(!result.status) return result
	
	const userId = result.data._id
	const generatedAccessToken = generateAccessToken({ id: userId, email: data.email, username: data.username })
	
	return {...result, accessToken: generatedAccessToken}
}

async function login({ email, username, password }){
	const result = await getUser({username, email})
	const user = result.data
	
	if(!result.status) return result
	
	const matchPassword = await isMatch(password, user.password)
	if(!matchPassword) return { status: false, message: "Kullanıcı bilgileri yanlış"}
	
	const verifyResult = await generateAccessTokenFromVerifyRefreshToken(user)
	if(!verifyResult.status) return verifyResult
	
	return {...result, accessToken: verifyResult.accessToken}
	
}

async function refreshToAccessToken(data){
	const user = await getUser(data)
	if(!user.status) return user
	
	const result = await generateAccessTokenFromVerifyRefreshToken(user.data)
	if(!result.status) return result
	return result
}

async function getUserInfo({id, username, email}){
	const result = await getUser({id, username, email})
	const user = result.data
	return result
}


async function verify(){}

async function isAuth(req){
	const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];
	
	if(!authHeader) return { status: false, message: "Token yok" }
	const verify = verifyAccessToken(token)
	
	if(verify.expired) return { status: false, message: "Tokenin süresi dolmuş" }
	if(!verify) return { status: false, message: "Geçersiz token" }
	return { status: true, message: "Token başarılı" }
}



async function logout(){}



export {
	register,
	login,
	refreshToAccessToken,
	getUserInfo,
	isAuth
}