import express from 'express';

import { userRoute, authRoute, productRoute } from '#routers'

const apiRouter = express.Router();

apiRouter.use('/users', userRoute)
apiRouter.use('/products', productRoute)
apiRouter.use('/auth', authRoute)

export default apiRouter;