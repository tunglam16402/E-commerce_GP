const router = require('express').Router();
const Controllers = require('../controllers/userController');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/register', Controllers.register);
router.post('/login', Controllers.login);
router.get('/current', verifyAccessToken, Controllers.getCurrent);
router.post('/refreshtoken', Controllers.refreshAccessToken);
router.get('/logout', Controllers.logout);
router.get('/forgotpassword', Controllers.forgotPassword);
router.put('/resetpassword', Controllers.resetPassword);
router.get('/', [verifyAccessToken, isAdmin], Controllers.getUsers);
router.delete('/', [verifyAccessToken, isAdmin], Controllers.deleteUser);
router.put('/current', verifyAccessToken, Controllers.updateUser);
router.put('/address', [verifyAccessToken], Controllers.updateUserAddress);
router.put('/cart', [verifyAccessToken], Controllers.updateCart);
router.put('/:uid', [verifyAccessToken, isAdmin], Controllers.updateUserByAdmin);

module.exports = router;
