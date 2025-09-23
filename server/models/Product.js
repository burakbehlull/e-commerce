import mongoose from "mongoose";
import slugify from "slugify"

import { generateId } from "#helpers"

const productSchema = new mongoose.Schema({
  id: {
	  type: String,
	  required: true,
	  unique: true,
	  default: ()=> generateId()
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  slug: { 
	type: String, unique: true 
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category"
	}
  ],
  brand: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  thumbnail: {
	type: String,
    required: false,
  },
  
  images: [
    {
      type: String,
    }
  ],
  averageRating: {
	type: Number,
	default: 0
  },
  ratingsCount: {
	type: Number,
	default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Product", productSchema)
