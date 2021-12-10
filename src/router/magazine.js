const express = require('express');
const router = express.Router();

//CONTROLLERS
const magazineController = require('../controllers/magazineController');

router.get('/create', magazineController().showMagazine);
router.post('/createBlog', magazineController().createBlog);



module.exports = router;