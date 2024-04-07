require('dotenv').config();

const express = require('express')
const cors = require('cors')

const { recipeRouter } = require('./routes/recipe.js')

// Instead of using hardcoded value read port from .env file
const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/',recipeRouter)

app.listen(port,() => {
    console.log(`Server is listening on port ${port}`)
})