const router = require('express').Router()
const knex= require('./database.demo')


// insert
router.post('/createdata',(req,res)=>{
    const user={
        Id: req.body.Id,
        Name: req.body.Name,
        Age: req.body.Age,
        Profile: req.body.Profile,
        Phone_no: req.body.Phone_no
    }
    knex('participants').insert(user)
        .then((data)=>{
            console.log("data inserted Successfully")
            res.send({"msg":"candidate data inserted sucssfully"})
        }).catch((err)=>{
            console.log("Error in Inserting",err)
        })


})

// get
router.get('/getting',(req,res)=>{
    knex().select("*").from('participants')
    .then((data)=>{
        crossOriginIsolated.log('Getting data')
    }).catach((err)=>{
        console.log('Error In Getting data')
    })
})

// update
// router.update('/updating',(req,res)=>{
//     knex.update(
//         res.body
//     )
//     .table('participants').where("Id",req.param.Id)
//     .then((data)=>{
//         console.log("Updated data  Successfully !")
//     }).catch((err)=>{
//         console.log("error in updtaing !")
//     })
// })

// delete
router.delete('/remove',(req,res)=>{
    knex('participants')
        .where({'Id':req.paramsm.Id}).del()
        .then((data)=>{
            console.log("Delete")
        })
        .catch((err)=>{
            console.log("Error in Deleting")
        })
    

})

module.exports=router;