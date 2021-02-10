const router = require('express').Router();
const { Category, Message, Post, User } = require('../models');

router.get('/', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    };

    Post.findAll({
        attributes: [
            'id',
            'title',
            'price',
            'description',
            // add images/upload
            'created_at'
        ],
        include: [
            {
                model: Message,
                attributes: [
                    'id',
                    'message_text',
                    'user_id',
                    'post_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
        .then(dbPostData => {

            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'price',
            'description',
            // add images/upload
            'created_at'
        ],
        include: [
            {
                model: Message,
                attributes: [
                    'id',
                    'message_text',
                    'user_id',
                    'post_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) { 
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // serialize the data and pass to template
            const post = dbPostData.get({ plain: true });
            
            res.render('single-post', { 
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    };

    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;