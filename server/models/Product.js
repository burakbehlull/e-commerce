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
  category: {
	  type: mongoose.Schema.Types.ObjectId, 
	  required: false,
	  ref: "Category"
  },
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
  /*
  sonra tamamlanacak
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String, trim: true }
    }
  ],
  
  averageRating: {
    type: Number,
    default: 0
  },
  */
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
