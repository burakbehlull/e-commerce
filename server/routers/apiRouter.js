import express from 'express';

import { userRoute, authRoute, productRoute, categoryRoute, basketRoute } from '#routers'

const apiRouter = express.Router();

apiRouter.use('/users', userRoute)
apiRouter.use('/products', productRoute)
apiRouter.use('/auth', authRoute)
apiRouter.use('/category', authRoute)
apiRouter.use('/basket', basketRoute)

export default apiRouter;