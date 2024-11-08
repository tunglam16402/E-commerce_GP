const router = require('express').Router();
const userControl = require('../controllers/userController');

const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/register', userControl.register);
router.post('/login', userControl.login);
router.get('/current', verifyAccessToken, userControl.getCurrent);
router.post('/refreshtoken', userControl.refreshAccessToken );
//vAT đăng nhập thì có token, có token thì mới logout
router.get('/logout', userControl.logout );

module.exports = router;
