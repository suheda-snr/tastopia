const express = require('express')
const { query } = require('../helpers/db')

const recipeRouter= express.Router()

recipeRouter.get('/recipes',async (req,res) => {
  try {
    const sql = `
    SELECT *
    FROM recipes
`;
    const result = await query(sql)
    const rows = result.rows ? result.rows : []
    res.status(200).json(rows)
  } catch(error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})

module.exports = {
    recipeRouter
  }



const app = express();

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await query('SELECT * FROM recipes');
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});