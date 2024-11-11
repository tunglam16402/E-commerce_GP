const router = require('express').Router();
const userControl = require('../controllers/userController');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/register', userControl.register);
router.post('/login', userControl.login);
router.get('/current', verifyAccessToken, userControl.getCurrent);
router.post('/refreshtoken', userControl.refreshAccessToken);
router.get('/logout', userControl.logout);
router.get('/forgotpassword', userControl.forgotPassword);
router.put('/resetpassword', userControl.resetPassword);
router.get('/', [verifyAccessToken, isAdmin], userControl.getUsers);
router.delete('/', [verifyAccessToken, isAdmin], userControl.deleteUser);
router.put('/current', verifyAccessToken, userControl.updateUser);
router.put('/:uid', [verifyAccessToken, isAdmin], userControl.updateUserByAdmin);

module.exports = router;
