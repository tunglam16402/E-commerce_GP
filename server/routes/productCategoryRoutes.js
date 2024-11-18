const router = require('express').Router();
const Controllers = require('../controllers/productCategoryController');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], Controllers.createCategory);
router.get('/', Controllers.getCategory);
router.put('/:pcid', [verifyAccessToken, isAdmin], Controllers.updateCategory);
router.delete('/:pcid', [verifyAccessToken, isAdmin], Controllers.deleteCategory);

module.exports = router;
