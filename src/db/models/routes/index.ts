import express from 'express';
import departmentRouter from '../routes/routes';

const routes = express.Router();

routes.use('/', departmentRouter);

export default routes;
