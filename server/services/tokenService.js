import jwt from "jsonwebtoken";
import { User } from "#models";

const ACCESS_KEY = process.env.JWT_ACCESS_SECRET ||  "cat"
const REFRESH_KEY = process.env.JWT_REFRESH_SECRET || "dog"

function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_KEY, { expiresIn: "30m" });
}


function generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_KEY, { expiresIn: "12h" });
}


function verifyAccessToken(token, isDecode) {
    try {
        return jwt.verify(token, ACCESS_KEY);
    } catch (err) {
        if(isDecode && err.name === "TokenExpiredError") {
            const decodeData = jwt.decode(token)
            return {...decodeData, expired: true }
        }
        return null;
    }
}

function verifyRefreshToken(token, isDecode) {
    try {
        return jwt.verify(token, REFRESH_KEY);
    } catch (err) {
        if(isDecode && err.name === "TokenExpiredError") {
            const decodeData = jwt.decode(token)
            return {...decodeData, expired: true }
        }
        return null;
    }
}

function isExpired(token, key) {
    const options = {
        ACCESS: ACCESS_KEY,
        REFRESH: REFRESH_KEY
    }
    const isOption = key ? options[key] : options["ACCESS"]
    
    try {
        const verify = jwt.verify(token, isOption);
        return { data: verify, expired: false };
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            const decodeData = jwt.decode(token)
            return { expired: true, data: decodeData };
        }
        return { expired: false, invalid: true, data: null };
    }
}

async function updateUserRefreshToken(username, refreshToken) {
    try {
		const user = await User.findOne({ username });
		if (!user) return {
			data: null,
			message: "Kullanıcı mevcut değil",
			status: false
		};
		const isToken = user.token == refreshToken
		if(isToken) return {
			data: null,
			message: "Token zaten var",
			status: false
		}
		
		user.token = refreshToken;
		await user.save();
		
		return {
			data: user,
			message: "Token yenilendi",
			status: true
		}
	} catch(err) {
		console.error("[ERROR tokenService/updateUserRefreshToken]: ", err.message)
		return {
			data: null,
			message: "Sistem hatası",
			status: false,
		}
		
	}
}

async function refreshAccessToken(refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) return null;

    const user = await User.findOne({ username: decoded.username });
    if (!user) return null;

    if (user.token !== refreshToken) return null;

    const newAccessToken = generateAccessToken({ username: user.username });
    return newAccessToken;
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    isExpired,
    updateUserRefreshToken,
    refreshAccessToken
};