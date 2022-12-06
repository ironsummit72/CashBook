const express= require("express");
const ejs= require("ejs");
const mongoose= require("mongoose");
const path= require("path");
var bodyParser = require('body-parser');
const { log } = require("console");
const port=800;
var MongoClient = require("mongodb").MongoClient;
const app = express();
const databaseUrl='mongodb://127.0.0.1:27017/cashbook'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



console.log("bal",getBalance());


//establish connection form database
mongoose.connect(databaseUrl);
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

app.get("/", (req, res) => {
    res.render('index')
});
app.post('/',(req, res) => {
let newBalance=parseInt(Balance)+parseInt(req.body.amount);
let remarks=req.body.remarks;
console.log("balance is "+newBalance);
console.log('remarks is ',remarks);
console.log('balance',Balance);

let schema={
    Deposit:parseInt(req.body.amount),
    AccountBalance:newBalance,
    Remarks:remarks
}
insertInDatabase(schema)
db.collection('accountbal').insertOne(schema,(err,result) => {
    if(err) throw err;
    else{
        console.log("inserting account balance");
    }
})
})


app.listen(port,function() {
    console.log(`listening on port ${port}`);
});

function insertInDatabase(schema) {

}

function getBalance() {
    MongoClient.connect(databaseUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("cashbook");
        dbo.collection("accountbal").find({}).toArray(function(err,result){
            if(err)throw err;
            for(var i=0; i<result.length; i++){
                resultFromDatabase=result;
            }
            
            db.close()
        })
        
      });
}

