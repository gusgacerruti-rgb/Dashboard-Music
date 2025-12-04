const express = require('express');
const router = express.Router();
const bandController = require('../controllers/bandController');

router.get('/', bandController.getAllBands);
router.get('/most-played', bandController.getMostPlayedBands);
router.get('/:id', bandController.getBandById);
router.post('/', bandController.createBand);
router.put('/:id', bandController.updateBand);
router.delete('/:id', bandController.deleteBand);

module.exports = router;
