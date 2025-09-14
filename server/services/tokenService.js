import jwt from "jsonwebtoken";

const ACCESS_KEY = process.env.JWT_ACCESS_SECRET ||  "cat"
const REFRESH_KEY = process.env.JWT_REFRESH_SECRET || "dog"

function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_KEY, { expiresIn: "30m" });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_KEY, { expiresIn: "12h" });
}
