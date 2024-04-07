const express = require('express')
const { query } = require('../helpers/db.js')

const recipeRouter= express.Router()

recipeRouter.get("/",async (req,res) => {
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