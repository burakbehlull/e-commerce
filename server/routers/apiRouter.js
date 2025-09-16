import express from 'express';

import { userRoute, authRoute } from '#routers'

const apiRouter = express.Router();

apiRouter.use('/users', userRoute)
apiRouter.use('/auth', authRoute)

export default apiRouter;