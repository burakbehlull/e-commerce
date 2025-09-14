import bcrypt from "bcryptjs"

async function isMatch(enteredPassword, userPasswordHash){
	const isMatch = await bcrypt.compare(enteredPassword, userPasswordHash);
	return isMatch ? true : false
}

async function isHash(password, stringValue){
	const getSalt = stringValue ? stringValue : 10
	const salt = await bcrypt.genSalt(getSalt)
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword
}