import express from 'express';

import { userRoute } from '#routers'

const apiRouter = express.Router();

apiRouter.use('/users', userRoute)

export default apiRouter;