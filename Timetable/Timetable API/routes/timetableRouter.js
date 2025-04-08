import express from 'express'
import * as controllers from '../controllers/timetableController.js'

const router = express.Router();

router.get('/', controllers.getClasses);

router.get('/:id', controllers.getClassesById);

router.delete('/:id', controllers.deleteClasses);

export default router;