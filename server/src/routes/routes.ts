import express from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import OrphanageControllers from '../controllers/OrphanageControllers';

const upload = multer(uploadConfig);

const routes = express.Router();

const orphanageControllers = new OrphanageControllers();

routes.post('/orphanages', upload.array('images'), orphanageControllers.create );

routes.get('/orphanages', orphanageControllers.index);

routes.get('/orphanages/:id' ,  orphanageControllers.show);

export default routes;