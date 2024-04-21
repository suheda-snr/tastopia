const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn} = require('../middleware');
const ratingsController = require('../controllers/ratings');
const catchAsync = require('../utils/catchAsync');
const { Rating, User } = require('../models/models');

// Route for creating or updating a rating for a recipe
router.post('/recipe/:id/rate', isLoggedIn, catchAsync(ratingsController.createOrUpdateRating));

// Route for fetching the user's rating for a recipe
router.get('/api/recipe/:id/user-rating', isLoggedIn, async (req, res) => {
    try {
        const { id: recipeId } = req.params;
        const userId = req.user.UserID;

        // Find the user's rating for the specified recipe
        const userRating = await Rating.findOne({ where: { recipeid: recipeId, userid: userId } });

        if (!userRating) {
            return res.status(404).json({ message: 'Rating not found for the current user and recipe.' });
        }

        // If the user's rating is found, send it in the response
        res.status(200).json({ success: true, rating: userRating });
    } catch (error) {
        console.error('Error fetching user rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Route for fetching all ratings for a recipe to display for everyone
router.get('/api/recipe/:id/ratings', async (req, res) => {
    try {
        const { id: recipeId } = req.params;

        // Find all ratings for the specified recipe
        const ratings = await Rating.findAll({ where: { recipeid: recipeId } });

        if (!ratings) {
            return res.status(404).json({ message: 'No ratings found for the recipe.' });
        }

        // If ratings are found, send them in the response
        res.status(200).json({ success: true, ratings });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;


