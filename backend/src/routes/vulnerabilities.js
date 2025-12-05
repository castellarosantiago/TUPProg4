const express = require('express');
const router = express.Router();
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: false });

router.post('/ping', vulnerabilityController.ping);

router.post('/transfer', csrfProtection, vulnerabilityController.transfer);

router.get('/file', vulnerabilityController.readFile);

router.post('/upload', uploadMiddleware, uploadFile);

module.exports = router;
