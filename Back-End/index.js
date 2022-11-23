require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require("fs");


const db = require('./models')
const handle = require('./handlers')
const routes = require('./routes')

const app = express()

const port = process.env.PORT || 4000


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload())

app.post('/upload-image/:id', upload.single('photo'), async (req, res) => {
    try {
        const image = req.files.photo
        console.log(req.params.id, 'idddd')

        image.mv(__dirname + '/uploads/' + req.params.id + '.jpg')
    } catch (error) {
        console.log(error)
    }
})


app.use('/user', routes.user)
// app.use(handle.notFound)
// app.use(handle.errors)

app.listen(port, console.log(`Server started on port ${port}...`))