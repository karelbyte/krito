import { Express } from 'express';
import userRoute from './routes/users';

const apiPrefix = '/api'
const router = (app: Express): void => {
    app.use(`${apiPrefix}/users`, userRoute)
}

export default router;