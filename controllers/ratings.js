const db = require('../server/helpers/db.js');
const { Recipe, Rating, User } = require('../models/models'); 

// Create or update a rating for a recipe
module.exports.createOrUpdateRating = async (req, res, next) => {
    try {
        const { id: recipeid } = req.params;
        const { rating } = req.body;
        const userId = req.user.UserID;

        // Check if the user is logged in
        if (!userId) {
            return res.status(401).json({ message: 'You must be signed in to rate a recipe' });
        }

        // Check if the user has already rated the recipe
        let existingRating = await Rating.findOne({ where: { recipeid, userid: userId } });

        // If the user has already rated the recipe, update their existing rating
        if (existingRating) {
            existingRating.rating = rating;
            await existingRating.save();
            res.status(200).json({ success: true, rating: existingRating, message: 'Rating updated successfully' });
        } else {
            // Create a new rating
            const newRating = {
                recipeid: recipeid,
                userid: userId, 
                rating: rating
            };
            const createdRating = await Rating.create(newRating);
            res.status(201).json({ success: true, rating: createdRating, message: 'Rating submitted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
