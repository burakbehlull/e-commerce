import { createUser, getUser } from "./userService.js"
import { isHash, isMatch } from "#helpers"
import { generateRefreshToken, generateAccessToken, 
	updateUserRefreshToken, isExpired, verifyRefreshToken,
	generateAccessTokenFromVerifyRefreshToken } from "./tokenService.js"

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
async function logout(){}
async function verify(){}
async function getUserInfo(){}


export {
	register,
	login
}