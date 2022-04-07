const express=require('express')
const app = express()
const port = 6000;

app.use(express.json());

app.use('./',require('./database.demo'))
app.use('./',require("./router.demo"))

app.listen(port,(req,res)=>{
    console.log(`SERVERIS RUNING ON PORT NO. ${ port}`)
})