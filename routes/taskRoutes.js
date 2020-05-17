const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */


/**
 * @swagger
 * /Task:
 *   post:
 *     description: This creates a task for a user 
 *     tags: [Tasks]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         description: Body of the request
 *         required: true
 *         type: json
 *     responses:
 *       200:
 *         description: created sucessfully
 *       422:
 *         description: Validation error. Just show the "msg" field to the Task to make it clear  
 *       410:
 *         description: Task was not saved to the database  
 *       411:
 *         description: password hashing error  
 */

router.post('/task', (req,res)=>{
    console.log("Adding New Post...");
    console.log(req.body.candidate_email);
    if(!req.body
.candidate_email){
        return res.status(400).json({
            sucess : false,
            message: "No email or email was not sent appropriately"
        });
    }else if(!req.body
.label){
        return res.status(401).json({
            sucess : false,
            message: "Task label is required"
        });
    }else{
        let task = new Task({
            candidate_email : req.body.candidate_email,
            label : req.body.label
        });

        task.save((err)=>{
            if (err) return res.status(500).json({
                sucess : false,
                message: "Task is not saved to the database"
            });
            
            return res.status(200).json({
                sucess : true,
                message: "Task is created"
            });
            
        });
    }






});


router.patch('/task', (res,req)=>{

});


router.get('/tasks', (res,req)=>{

});


 
module.exports = router;
