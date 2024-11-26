const router = require('express').Router();
const upload = require('../config/cloudinary.config');
const Controllers = require('../controllers/blogController');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], Controllers.createNewBlog);
router.get('/', Controllers.getBlogs);
router.get('/one/:bid', Controllers.getBlog);

router.put('/like/:bid', verifyAccessToken, Controllers.likeBlog);
router.put('/dislike/:bid', verifyAccessToken, Controllers.disLikeBlog);
router.put('/:bid', [verifyAccessToken, isAdmin], Controllers.updateBlog);
router.delete('/:bid', [verifyAccessToken, isAdmin], Controllers.deleteBlog);
router.put('/image/:bid', [verifyAccessToken, isAdmin], upload.single('file'), Controllers.uploadBlogProduct);

module.exports = router;
