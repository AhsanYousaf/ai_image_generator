const express = require('express');
const { generateImage } = require('../controlers/openaiControler');
const router = express.Router();

router.post('/generateimage', generateImage);

module.exports = router;