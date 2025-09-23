import express from 'express';

import { userRoute, authRoute, productRoute, categoryRoute, basketRoute, ratingRoute } from '#routers'

const apiRouter = express.Router();

apiRouter.use('/users', userRoute)
apiRouter.use('/products', productRoute)
apiRouter.use('/auth', authRoute)
apiRouter.use('/category', authRoute)
apiRouter.use('/basket', basketRoute)
apiRouter.use('/rating', basketRoute)

export default apiRouter;