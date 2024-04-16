const { Recipe } = require('../models/models');
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
exports.showRecipeForm = (req, res) => {
    res.redirect('/MyTastopia.html'); // Redirect to the static HTML page
};
