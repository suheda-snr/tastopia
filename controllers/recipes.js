const { Recipe } = require('../models/models');

exports.submitRecipe = async (req, res, next) => {
    try {
        const { userid, title, description, ingredients, instructions, category, picture } = req.body;
        const newRecipe = await Recipe.create({
            userid,
            title,
            description,
            ingredients,
            instructions,
            postdate: new Date(),
            category,
            picture
        });
        res.status(201).json({ success: true, message: "Recipe created successfully!", recipeId: newRecipe.id });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.showRecipeForm = (req, res) => {
    res.redirect('/MyTastopia.html'); // Redirect to the static HTML page
};
