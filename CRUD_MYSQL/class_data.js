const express = require("express")
const app = express()
app.use(express.json())
const port = 4000;

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Megha@8287',
        database: 'class'
    }
});

// creating table
knex.schema.hasTable("demo").then(function (exits) {
    if (!exits) {
        return knex.schema.createTable("demo", function (table) {
            table.increments('Userid').primary();
            table.string("Name");
            table.string("Email");
            table.string("Password");
        })
    }
})
.then((data)=>{
    console.log("table has created")
})
.catch((error)=>{
    console.log("error")
})




// inserting data into table

app.post('/',(req,res) =>{
    knex("demo").insert({
        Userid : req.body.Userid,
        Name : req.body.Name,
        Email : req.body.Email,
        Password : req.body.Password
        
    })
    .then((data)=>{
        console.log(data,'data inserted successfully')
        res.send(data)
    })
    .catch((err)=>{
        console.log(err,"err")
        req.send(err)
    })
})
console.log("relax")


// geeting data from a table
app.get('/getting',(req,res)=>{
    knex.select('*').from("demo")
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log(err)
        res.send(err)
    })
})

// updating data from table
app.put('/profile-edit/:Userid',(req,res)=>{
    knex.update(
        req.body
        )
        .table('demo').where('Userid',req.params.Userid)
        .then((data)=>{
            console.log("updating");
            res.json(data)
        }).catch((err)=>{
            console.log("not updating")
            res.json(err)
        })
})
app.listen(port,()=>{
    console.log(`your port is working ${port}`)
})

// delete data from table
app.delete("/remove/:id",(req,res)=>{
    knex("demo").where('Userid',req.params.id).del()
    .then((data)=>{
        res.send("user remove successfully")
        console.log("user remove the data from table")
    })
    .catch((err)=>{
        res.json({err:err.message})
        console.log("error")
    })
})



