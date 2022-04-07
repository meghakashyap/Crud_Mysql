const express = require('express')
const bodyParser =require("body-parser")
const port = 5000;
const app = express()

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("hey we are runing from port num 5000")
})

app.post("/add",(req,res)=>{
    req.body()
})


app.listen(port,(req,res)=>{
    console.log(`Server is runing on port no. ${port}`)
})