import express from 'express';

import { userRoute, authRoute, productRoute, categoryRoute } from '#routers'

const apiRouter = express.Router();

apiRouter.use('/users', userRoute)
apiRouter.use('/products', productRoute)
apiRouter.use('/auth', authRoute)
apiRouter.use('/category', authRoute)

export default apiRouter;