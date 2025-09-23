import { Rating, Product } from "#models/Rating.js";

async function updateProductStats(productId) {
    const stats = await Rating.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: "$product",
                averageRating: { $avg: "$rating" },
                ratingsCount: { $sum: 1 }
            }
        }
    ]);

    if (stats.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            averageRating: stats[0].averageRating,
            ratingsCount: stats[0].ratingsCount
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            averageRating: 0,
            ratingsCount: 0
        });
    }
}

const addOrUpdateRating = async (userId, productId, rating, comment) => {
    try {
        let userRating = await Rating.findOne({ user: userId, product: productId });

        if (userRating) {
            userRating.rating = rating;
            userRating.comment = comment;
            await userRating.save();
        } else {
            userRating = await Rating.create({
                user: userId,
                product: productId,
                rating,
                comment
            });
        }

        await updateProductStats(productId);

        return {
            status: true,
            message: userRating ? "Rating kaydedildi / güncellendi" : "Rating eklendi",
            data: userRating
        };
    } catch (err) {
        return {
            status: false,
            message: "Rating eklenemedi/güncellenemedi",
            error: err.message
        };
    }
};

const getProductRatings = async (productId) => {
    try {
        const ratings = await Rating.find({ product: productId }).populate("user", "name email");
        return {
            status: true,
            data: ratings
        };
    } catch (err) {
        return {
            status: false,
            message: "Ratingler alınamadı",
            error: err.message
        };
    }
};

export {
    addOrUpdateRating,
    getProductRatings
};
