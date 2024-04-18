const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isCommentAuthor } = require('../middleware'); // Middleware to check user login and authorization
const commentsController = require('../controllers/comments');
const catchAsync = require('../utils/catchAsync'); // Utility for handling exceptions inside async routes without multiple try/catch blocks
const { Comment,User } = require('../models/models');
router.post('/recipe/:id/comment', isLoggedIn, catchAsync(commentsController.createComment));

router.delete('/recipe/:id/comment/:commentid', isLoggedIn, isCommentAuthor, catchAsync(commentsController.deleteComment));

router.get('/api/recipe/:id/comments', async (req, res) => {
    try {
        const recipeid = req.params.id;
        const comments = await Comment.findAll({
            where: { recipeid: recipeid },
            include: [{
                model: User,
                as: 'user',  // Use the alias defined in your model associations
                attributes: ['Username']
            }],
            order: [['postdate', 'DESC']] 
        });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;