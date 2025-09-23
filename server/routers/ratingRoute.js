import express from "express";

import { AddOrUpdateRating, GetProductRatings } from "#controllers";
import { authMiddleware } from "#middlewares";

const router = express.Router();

router.post("/", authMiddleware, AddOrUpdateRating);
router.get("/:productId", GetProductRatings);

export default router;
