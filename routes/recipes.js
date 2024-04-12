const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const recipes = require('../controllers/recipes');

// Route to display the form to create a new recipe
router.get('/recipe/new', isLoggedIn, recipes.showRecipeForm);

// Route to handle the submission of the form
router.post('/recipe', isLoggedIn, recipes.submitRecipe);

router.get('/api/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (recipe) {
            res.json(recipe);  // Send the recipe data as JSON
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});