const router = require('express').Router();

const userRoutes = require('./user-routes');
const messageRoutes = require('./message-routes');
const postRoutes = require('./post-routes');
const chatRoutes = require('./chat-routes');
const textRoutes = require('./text-routes');
const tagRoutes = require('./tag-routes.js');

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);
router.use('/chats', chatRoutes);
router.use('/texts', textRoutes);


module.exports = router;