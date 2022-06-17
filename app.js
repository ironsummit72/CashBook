const express= require("express");
const ejs= require("ejs");
const mongoose= require("mongoose");
const path= require("path");
const port=800;



const app = express();
app.use(express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render('index')
});


app.listen(port,function() {
    console.log(`listening on port ${port}`);
});

