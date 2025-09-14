import { createUser } from "./userService.js"
import { isHash } from "#helpers"
import { generateRefreshToken, generateAccessToken } from "./tokenService.js"

async function register(data){
	if(!data) return null
	
	const generatedRefreshToken = generateRefreshToken({email: data.email, username: data.username})
	const hashedPassword = await isHash(data.password)
	
	const result = await createUser({...data, password: hashedPassword, token: generatedRefreshToken})
	
	const userId = result.data._id
	const generatedAccessToken = generateAccessToken({ id: userId, email: data.email, username: data.username })
	
	return {...result, token: generatedAccessToken}
}

async function login(){}
async function logout(){}
async function verify(){}
async function getUserInfo(){}


