const router = require('express').Router();
const { Chat, User, Post, Message, Category } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/:id', (req, res) => {
    Chat.findOne({
        where: {
            id: req.params.id
        },
        attributes:[
            'id',
            'recipient',
            'post_id',
            'user_id',
            'chat_text'
        ],
        include: [
                 {
                model:User,
                attributes: ['username']
            }
        ]
    })
    .then(chatData => {
        // console.log(postData)
        res.json(chatData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});





router.post('/', withAuth, (req,res) => {
    Chat.create({
        user_id: req.session.user_id,
        chat_text: req.chat_text,
        recipient: req.post.user_id,
        post_id: req.post_id
    })
    .then(chatData => res.json(chatData))
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});

module.exports = router;