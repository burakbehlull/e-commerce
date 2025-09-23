import { ratingService } from "#services";
import { logger } from "#config";

const { addOrUpdateRating, getProductRatings } = ratingService;

const AddOrUpdateRating = async (req, res) => {
    const user = req?.user;
    const { productId, rating, comment } = req.body;

    try {
        if (!user?._id) {
            return res.status(403).json({ status: false, message: "Yetkiniz yok" });
        }

        const result = await addOrUpdateRating(user._id, productId, rating, comment);

        if (!result.status) return res.status(400).json(result);

        return res.status(200).json(result);
    } catch (err) {
        console.error("[ERROR - ratingController/AddOrUpdateRating]: ", err.message);
        logger.error("[ERROR - ratingController/AddOrUpdateRating]: ", err.message);
        return res.status(500).json({
            status: false,
            error: err,
            message: err.message
        });
    }
};

const GetProductRatings = async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await getProductRatings(productId);

        if (!result.status) return res.status(400).json(result);

        return res.status(200).json(result);
    } catch (err) {
        console.error("[ERROR - ratingController/GetProductRatings]: ", err.message);
        logger.error("[ERROR - ratingController/GetProductRatings]: ", err.message);
        return res.status(500).json({
            status: false,
            error: err,
            message: err.message
        });
    }
};

export {
	AddOrUpdateRating,
	GetProductRatings
}