const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const mongo_url = "mongodb://127.0.0.1:27017/userauthantication"
const cors = require('cors')
const PORT = process.env.PORT || 4800
const auth = require('./route/userAuth')
const app = express()

dotenv.config()



app.use(cors())

app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())



//// DB Connection
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {

    console.log('Failed to connect to MongoDB', err);

});



app.use("/api",auth)



app.listen(PORT,()=>{
    console.log("server running.")
})