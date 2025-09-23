import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    trim: true
  }
}, { timestamps: true });

ratingSchema.index({ product: 1, user: 1 }, { unique: true });

ratingSchema.statics.updateProductRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        ratingsCount: { $sum: 1 }
      }
    }
  ]);

  if (result.length > 0) {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      averageRating: result[0].averageRating,
      ratingsCount: result[0].ratingsCount
    });
  } else {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      averageRating: 0,
      ratingsCount: 0
    });
  }
};

ratingSchema.post("save", function () {
  this.constructor.updateProductRating(this.product);
});

ratingSchema.post("remove", function () {
  this.constructor.updateProductRating(this.product);
});

export default mongoose.model("Rating", ratingSchema);
