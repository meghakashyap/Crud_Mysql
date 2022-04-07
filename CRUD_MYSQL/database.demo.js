const knex = require('knex')({
    client:'mysql',
    connection :{
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : 'Megha@8287',
        database : 'Profiles'

    }
})



knex.schema.hasTable('participants').then((Exist)=>{
    knex.schema.createTable('participants',(table)=>{
        table.increment('Id').primary();
        table.string("Name");
        table.integer("Age");
        table.string("Profile");
        table.integer("Phone_no")
    })

}).then((data)=>{
    console.log(data,"Table Created Successfully")
}).catch((err)=>{
    console.log("Not created!")
})

module.exports=knex;