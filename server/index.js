const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())

const port = 3001

app.get('/', (req, res) => {
    res.status(200).json({result:'success'})
})

app.listen(port,() => {
    console.log(`Server is listening on port ${port}`)
})