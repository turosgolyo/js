import express from 'express'
import * as controllers from '../controllers/timetableController.js'

const router = express.Router();

router.get('/', controllers.getClasses);

router.get('/:id', controllers.getClassesById);

router.delete('/:id', controllers.deleteClasses);

// New delete route to delete class by day and period
router.delete('/', controllers.deleteClassByDayPeriod);

router.post('/', controllers.addClass);

export default router;
