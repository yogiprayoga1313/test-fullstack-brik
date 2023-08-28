require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT

const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('uploads'))
app.use('/', require('./src/routers'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
