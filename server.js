const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://eduard:ZtuxBcgBfVbtz4cC@cluster0.6xizy.mongodb.net/noteDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
)

app.use('/', require('./routes/noteRoute'))

app.listen(9000, function () {
    console.log('Running on port 9000')
})