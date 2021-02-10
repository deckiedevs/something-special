const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const messageRoutes = require('./message-routes.js');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/posts', postRoutes);

module.exports = router;