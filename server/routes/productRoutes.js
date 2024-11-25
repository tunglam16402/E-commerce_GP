const router = require('express').Router();
const Controllers = require('../controllers/productController');
const upload = require('../config/cloudinary.config');
const asyncHandler = require('express-async-handler');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/create_product', [verifyAccessToken, isAdmin], Controllers.createProduct);
router.get('/', Controllers.getAllProduct);
router.put('/ratings', verifyAccessToken, Controllers.ratings);

router.put('/upload/:pid', [verifyAccessToken, isAdmin], upload.single('file'), Controllers.uploadImageProduct);

//xem sản phẩm thì không cần xác thực đăng nhập
router.get('/:pid', Controllers.getProduct);
router.put('/:pid', [verifyAccessToken, isAdmin], Controllers.updateProduct);
router.delete('/:pid', [verifyAccessToken, isAdmin], Controllers.deleteProduct);

module.exports = router;
