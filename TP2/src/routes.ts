const express = require('express');
const router = express.Router();

const orderRoutes = require("./orderRoutes.ts");

router.use('/orders', orderRoutes);

module.exports = router;