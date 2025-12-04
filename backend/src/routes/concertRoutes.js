const express = require('express');
const router = express.Router();
const concertController = require('../controllers/concertController');

router.get('/', concertController.getAllConcerts);
router.get('/calendar', concertController.getConcertsForCalendar);
router.post('/', concertController.createConcert);
router.delete('/:id', concertController.deleteConcert);

module.exports = router;
