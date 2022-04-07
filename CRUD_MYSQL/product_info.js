
const express = require("express")
const app = express()
app.use(express.json())
const port = 4000;

app.use(
    express.urlencoded({
      extended: true,
    })
);

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Megha@8287',
        database: 'Products'
    }
});
// Creating table

knex.schema.hasTable("users").then(function (exsist) {
    if (!exsist) {
        return knex.schema.createTable("users", function (table) {
            table.increment('id').primary();
            table.string('Name');
            table.integer('Price');
            table.integer('Quantity');
        })
    }
})
.then((data)=>{
    console.log("table has created")
})
.catch((error)=>{
    console.log("error in creating")
})




// inserting table
app.post('/',(req,res) =>{
    knex("users").insert({
        Name: req.body.Name,
        Price: req.body.Price,
        Quantity: req.body.Quantity
    })
    .then((data)=>{
        console.log(data,'data inserted successfully')
        res.send(data)
    })
    .catch((err)=>{
        console.log("err")
        req.send(err)
    })
})

app.listen(port,()=>{
    console.log(`Your Port is working on ${port}`)
})