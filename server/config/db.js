import mongoose from 'mongoose'
import { logger } from '#config'

export default async function db(){
	const MONGO_URI = process.env.MONGO_URI
	try {
		if(!MONGO_URI) {
			logger.error("MongoDB bağlantısı girilmemiş", err.message)
			return null
		}
		const conn = await mongoose.connect(MONGO_URI)
		console.log("Veritabanına bağlandı")
		return conn
	} catch(err) {
		console.error("Veritabanı hatası: ", err)
		logger.error("Veritabanı hatası: ", err.message)
		return null
	}
}