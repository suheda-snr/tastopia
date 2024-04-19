const express = require('express');
const router = express.Router();
const path = require('path');
const { isLoggedIn } = require('../middleware');
const recipes = require('../controllers/recipes');
const { Recipe } = require('../models/models');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // make sure this directory already exists
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route to display the form to create a new recipe
router.get('/recipe/new', isLoggedIn, recipes.showRecipeForm);

// Route to handle the submission of the form
router.post('/recipe', isLoggedIn, upload.single('picture'), recipes.submitRecipe);

router.get('/recipe/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'recipePage.html'));
});

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

// Route to get recipes by user ID
router.get('/api/user/recipes', isLoggedIn, recipes.getRecipesByUserId);

// Route to delete a recipe by its ID
router.delete('/api/recipe/:id', isLoggedIn, recipes.deleteRecipeById);

// Route to delete a recipe by recipe ID
router.delete('/api/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (recipe) {
            // Extract the filename from the picture path
            const filename = path.basename(recipe.picture);
            
            // Construct the full path to the image file
            const filePath = path.join('uploads/', filename);

            // Delete the associated image file if it exists
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Synchronously delete the image file
            }

            await recipe.destroy(); // Delete the recipe
            res.status(200).json({ message: 'Recipe deleted successfully' });
            alert("Recipe deleted successfully");
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;