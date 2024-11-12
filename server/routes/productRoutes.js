const router = require('express').Router();
const productControl = require('../controllers/productController');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/create_product', [verifyAccessToken, isAdmin], productControl.createProduct);
router.get('/', productControl.getAllProduct);

//xem sản phẩm thì không cần xác thực đăng nhập
router.get('/:pid', productControl.getProduct);
router.put('/:pid', [verifyAccessToken, isAdmin], productControl.updateProduct);
router.delete('/:pid', [verifyAccessToken, isAdmin], productControl.deleteProduct);

module.exports = router;
