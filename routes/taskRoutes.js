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
 * /task:
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
 *         schema:
 *          required:
 *              - candidate_email
 *              - label
 *          properties: 
 *           candidate_email:
 *              type: string
 *              required: true
 *              description: This is required so candidates won't mess up each other's tasks
 *           label:
 *              type: string
 *              required: true
 *              description: Name of the task
 *     responses:
 *       200:
 *         description: Task is created
 *       400:
 *         No email or email was not sent appropriately
 *       401:
 *         description: Task label is required
 *       500:
 *         description: Task is not saved to the database
 *       
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
