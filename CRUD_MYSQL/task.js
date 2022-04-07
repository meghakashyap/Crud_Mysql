const express=require('express');
const { get, send } = require('express/lib/response');
const app= express()
app.use(express.json())
const port = 8000;
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Megha@8287',
        database: 'tasks'
    }
});

const chalk =require('chalk');
console.log(chalk.red("Hey Megha"))

// creating Information  table
knex.schema.hasTable("Information").then(function (exits) {
    if (!exits) {
        return knex.schema.createTable("Information", function (table) {
            table.increments('Userid').primary();
            table.string("Name");
            table.string("Class");
            table.string("Address");
        })
    }


})
.then((data)=>{
    console.log("Information table has created")
})
.catch((error)=>{
    console.log("error in information table")
})

// creating Marks table
knex.schema.hasTable("Marks").then(function (exits) {
    if (!exits) {
        return knex.schema.createTable("Marks", function (table) {
            table.increments('Userid').primary();
            table.string("Subject");
            table.integer("Marks");
        })
    }


})
.then((data)=>{
    console.log("Marks table has created")
})
.catch((error)=>{
    console.log("Error in marks table")
})

// creating Grade  table
knex.schema.hasTable("Grade").then(function (exits) {
    if (!exits) {
        return knex.schema.createTable("Grade", function (table) {
            table.increments('Userid').primary();
            table.string("Subject");
            table.integer("Marks");
        })
    }
})
.then((data)=>{
    console.log(" Grade table has created")
})
.catch((error)=>{
    console.log("Error in Grade table")
})



// inserting data for information
app.post('/info',(req,res) =>{
    knex("Information").insert({
        Userid : req.body.Userid,
        Name : req.body.Name,
        Class : req.body.Class,
        Address : req.body.Address
        
    })
    .then((data)=>{
        console.log(data,'data inserted successfully In Information table')
        res.send(data)
    })
    .catch((err)=>{
        console.log("err inserting data in Information table")
        req.send(err)
    })
})



// inserting in Marks
app.post('/grade',(req,res) =>{
    knex("Grade").insert({
        Userid : req.body.Userid,
        Subject : req.body.Subject,
        Marks : req.body.Marks
        
    })
    .then((data)=>{
        console.log(data,'data inserted successfully in Grade table')
        res.send(data)
    })
    .catch((err)=>{
        console.log("err inserting data in Grade table")
        req.send(err)
    })
})


// inserting in Grade
app.post('/marks',(req,res) =>{
    knex("Marks").insert({
        Userid : req.body.Userid,
        Subject : req.body.Subject,
        Marks : req.body.Marks
        
    })
    .then((data)=>{
        console.log(data,'data inserted successfully in Marks table')
        res.send(data)
    })
    .catch((err)=>{
        console.log("err inserting data in Marks table")
        req.send(err)
    })
})



// update information
app.put('/info/:Userid',(req,res)=>{
    knex.update(
        req.body
    )
    .table("Information").where("Userid",req.params.Userid)
    .then((data)=>{
        console.log(data,'data updated successfully in Information table')
        res.json(data)
    })
    .catch((err)=>{
        console.log("error updated data in Information table")
        res.json(err)

    })
})

// update Marks
app.put('/marks/:Userid',(req,res)=>{
    knex.update(req.body)
    .table("Marks").where("Userid",req.param.Userid)
    .then((data)=>{
        console.log(data,'data updated successfully in Marks table')
        res.json(data)
    })
    .catch((err)=>{
        console.log("error updated data in Marks table")
        req.json(err)

    })
})

// update Grade
app.put('/grade/:Userid',(req,res)=>{
    knex.update(
        req.body
    )
    .table("Grade").where("Userid",req.param.Userid)
    .then((data)=>{
        console.log(data,'data updated successfully in Grade table')
        res.json(data)
    })
    .catch((err)=>{
        console.log("err updated data in Grade table")
        req.json(err)

    })
})



// getting data from Information
app.get('/info',(req,res)=>{
    knex.select("*").from('Information')
    .then((data)=>{
        console.log('Getting data from Information ')
        res.send(data)
    })
    .catch((err)=>{
        console.log("Error in Getting data from Information")
        res.send(err)
    })
})

// getting data from Marks
app.get('/marks',(req,res)=>{
    knex.select("*").from('Marks')
    .then((data)=>{
        console.log('Getting data from Marks ')
        res.send(data)
    })
    .catch((err)=>{
        console.log("Error in Getting data from Marks")
        res.send(err)
    })
})

// getting data from Grade
app.get('/grade',(req,res)=>{
    knex.select("*").from('Grade')
    .then((data)=>{
        console.log('Getting data from Grade ')
        res.send(data)
    })
    .catch((err)=>{
        console.log("Error in Getting data from Grade")
        res.send(err)
    })
})

// deleting data from Information
app.delete('/info/:Userid',(req,res)=>{
    knex("Information").where({"Userid":req.params.Userid}).del()
    .then((data)=>{
        console.log("Deleting data from Information")
        res.sendStatus(status)
        res.send(data)

    })
    .catch((err)=>{
        console.log("Error in Deleting data from Information")
        res.send(err)
    })
})

// deleting data from Marks
app.delete('/marks/:Userid',(req,res)=>{
    knex("Marks").where({"Userid":req.params.Userid}).del()
    .then((data)=>{
        console.log("Deleting data from Marks")
        res.sendStatus(status)
        res.send(data)

    })
    .catch((err)=>{
        console.log("Error in Deleting data from Marks")
        res.send(err)
    })
})

// deleting data from Grade
app.delete('/grade/:Userid',(req,res)=>{
    knex("Grade").where("Userid",req.params.Userid).del()
    .then((data)=>{
        console.log("Deleting data from Grade")
        res.sendStatus(status)
        // res.send(data)

    })
    .catch((err)=>{
        console.log("Error in Deleting data from Grade")
        res.json(err)
    })
})


app.listen(port,((req,res)=>{
    console.log(`SERVER IS LISTENING PORT NO. ${port}`)
}));
