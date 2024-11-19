const router = require('express').Router();
const Controllers = require('../controllers/blogController');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], Controllers.createNewBlog);
router.get('/', Controllers.getBlog);
router.put('/like', verifyAccessToken, Controllers.likeBlog);

router.put('/:bid', [verifyAccessToken, isAdmin], Controllers.updateBlog);

module.exports = router;
