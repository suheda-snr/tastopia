const { Recipe,Comment, Rating } = require('../models/models');
const db = require('../server/helpers/db.js');
exports.submitRecipe = async (req, res, next) => {
    try {
        const { title, preptime, description, ingredients, instructions, category } = req.body;
        const userid = req.user.UserID;
        const image = req.file ? req.file.path : null; // Handling the file path if an image was uploaded
        const newRecipe = await Recipe.create({
            userid,
            title,
            preptime,
            description,
            ingredients,
            instructions,
            postdate: new Date(),
            category,
            picture: image // Store the path to the image in your database
        });
        res.status(201).json({ success: true, message: "Recipe created successfully!", recipeid: newRecipe.recipeid});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// This function will get all recipes by a specific user ID to display on their MyTastopia page
exports.getRecipesByUserId = async (req, res, next) => {
    try {
        const userid = req.user.UserID; // Assuming you're using some form of authentication middleware that attaches the user ID to the request object
        const recipes = await Recipe.findAll({ where: { userid } });
        res.status(200).json({ success: true, recipes });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const fs = require('fs');

exports.deleteRecipeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userid = req.user.UserID;
        
        await Comment.destroy({
            where: { recipeid: id }
        });
        await Rating.destroy({
            where: { recipeid: id }
        });

        // Check if the recipe belongs to the logged-in user
        const recipe = await Recipe.findOne({ where: { recipeid: id, userid } });

        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found or you do not have permission to delete it.' });
        }

        // Delete the recipe image file if it exists
        if (recipe.picture) {
            fs.unlinkSync(recipe.picture); // Delete the image file from the filesystem
        }

        // Delete the recipe
        await recipe.destroy();

        res.status(200).json({ success: true, message: 'Recipe deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.showRecipeForm = (req, res) => {
    res.redirect('/MyTastopia.html'); // Redirect to the static HTML page
};
