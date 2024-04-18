
const db = require('../server/helpers/db.js');
const { Recipe, Comment, User } = require('../models/models'); 

module.exports.createComment = async (req, res, next) => {
    try {
        const { id: recipeid } = req.params;
        const { commenttext } = req.body;
        const recipe = await Recipe.findByPk(recipeid);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        const newComment = {
            commenttext: commenttext,
            userid: req.user.UserID,
            recipeid: recipeid
        };
        const createdComment = await Comment.create(newComment);
        const fullComment = await Comment.findByPk(createdComment.commentid, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['Username']
            }]
        });
        if (!fullComment) {
            return res.status(404).send('Comment created but not found');
        }

        res.status(201).json({ success: true, comment: fullComment });
        //res.status(201).json({ success: true, comment: fullComment || createdComment });
        //res.redirect(`/recipe/${recipeid}`); // Redirect back to the recipe page
    } catch (error) {
        //next(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteComment = async (req, res, next) => {
    try {
        const { recipeid, commentid } = req.params;
        const comment = await Comment.findByPk(commentid);
        if (!comment) {
            throw new Error('Comment not found');
        }
        if (comment.userid !== req.user.id) { // Ensure only the comment author can delete
            throw new Error('Unauthorized attempt to delete comment');
        }
        await comment.destroy();
        res.redirect(`/recipe/${recipeid}`);
    } catch (error) {
        next(error);
    }
};