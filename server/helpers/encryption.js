import bcrypt from "bcryptjs"

async function isMatch(enteredPassword, userPasswordHash){
	const isMatch = await bcrypt.compare(enteredPassword, userPasswordHash);
	return isMatch ? true : false
}

async function isHash(password, saltValue=10){
	const salt = await bcrypt.genSalt(saltValue)
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword
}