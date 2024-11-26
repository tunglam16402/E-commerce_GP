const router = require('express').Router();
const upload = require('../config/cloudinary.config');
const Controllers = require('../controllers/orderController');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken], Controllers.createOrder);
router.get('/', [verifyAccessToken], Controllers.getUserOrder);
router.get('/admin', [verifyAccessToken, isAdmin], Controllers.getOrders);
router.put('/status/:oid', [verifyAccessToken, isAdmin], Controllers.updateStatus);

module.exports = router;
