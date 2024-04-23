const express = require('express');
const router = express.Router();
const crtlMain = require('../controllers/main');

/* GET home page. */
router.get('/', crtlMain.index);
module.exports = router;
