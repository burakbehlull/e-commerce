import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	globalName: { type: String },
    username: { 
		type: String, 
		unique: true, 
		trim: true, 
		required: true 
	},
	password: { type: String, required: true },
    email: { type: String, 
		unique: true, 
		lowercase: true, 
		required: true 
	},
	phone: { 
		type: String,
		required: true,
		unique: true,
	},
	address: { type: String },
    createdAt: { type: Date, default: Date.now },
    token: { type: String, required: true }  
});

export default mongoose.model("User", userSchema);