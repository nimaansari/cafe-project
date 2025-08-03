const express = require("express");
const router = express.Router();
const { orderMenu, orderHistory } = require("../controllers/orderController");

router.post('/', orderMenu);
router.get('/', orderHistory);

module.exports = router;