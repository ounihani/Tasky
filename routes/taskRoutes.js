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

router.post('/task', (req, res) => {
    console.log("Adding New Post...");
    console.log(req.body.candidate_email);
    if (!req.body.candidate_email) {
        return res.status(400).json({
            sucess: false,
            message: "No email or email was not sent appropriately"
        });
    } else if (!req.body.label) {
        return res.status(401).json({
            sucess: false,
            message: "Task label is required"
        });
    } else {
        let task = new Task({
            candidate_email: req.body.candidate_email,
            label: req.body.label
        });

        task.save((err) => {
            if (err) return res.status(500).json({
                sucess: false,
                message: "Task is not saved to the database"
            });

            return res.status(200).json({
                sucess: true,
                message: "Task is created"
            });

        });
    }






});


/**
 * @swagger
 * /task:
 *   patch:
 *     description: This changes the status of a task. If the task is checked it changes it's status to unchecked and vice-versa 
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
 *              - task_id
 *          properties: 
 *           task_id:
 *              type: string
 *              required: true
 *              description: The id of the task that will be changed
 *     responses:
 *       200:
 *         description: Task status is changed
 *       400:
 *         description: the id of the task needs to be specified
 *       404:
 *         description: Task Not Found!
 *       405:
 *         description: Error while getting task!
 *       500:
 *         description: Task is not saved to the database
 *       
 */

router.patch('/check_task/:task_id', (req, res) => {
    console.log("checking/unchecking a task...");
    if (!req.params.task_id) {
        return res.status(400).json({
            sucess: false,
            message: "You have to specify the id of the task to check"
        });
    } else {

        let task = Task.findOne({
            _id: req.params.task_id
        }, (err, task) => {
            if (err) {
                return res.status(405).json({
                    sucess: false,
                    msg: "Error while getting task!"
                });
            } else if (!task) {
                return res.status(404).json({
                    sucess: false,
                    msg: "Task Not Found!"
                });
            } else {
                console.log(task.label);
                if (task.isDone == true) {
                    task.isDone = false;
                } else {
                    task.isDone = true;
                }

                task.save((err) => {
                    if (err) return res.status(500).json({
                        sucess: false,
                        message: "Task is not saved to the database"
                    });

                    return res.status(200).json({
                        sucess: true,
                        message: "Task status is changed"
                    });

                });
            }
        });

    }
});


/**
 * @swagger
 * /tasks:
 *   get:
 *     description: This retrieves the list of check or unchecked tasks ( depends on which type the user of this api specifies) 
 *     tags: [Tasks]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: checked
 *         description: this is made to specify which kind of tasks to retrieve
 *         required: true
 *         type: boolean
 *       - in: query
 *         name: candidate_email
 *         description: This is required so candidates won't mess up each other's tasks
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: returns an array of tasks
 *       400:
 *         description: No email or email was not sent appropriately
 *       401:
 *         description: You have to specify which kind of tasks you want to get
 *       500:
 *         description: Error when retrieving tasks from the database
 *       
 */

router.get('/tasks', (req, res) => {
    console.log("getting tasks...");
    if (!req.query.candidate_email) {
        return res.status(400).json({
            sucess: false,
            message: "No email or email was not sent appropriately"
        });
    } else if (req.query.checked == undefined || req.query.checked == null){
        return res.status(401).json({
            sucess: false,
            message: "You have to specify which kind of tasks you want to get"
        });
    } else {
        let task = Task.find({
            candidate_email: req.query.candidate_email,
            isDone: req.query.checked
        }, (err, tasks) => {
            if (err) return res.status(500).json({
                sucess: false,
                message: "Error when retrieving tasks from the database"
            });
            return res.status(200).json({
                sucess: true,
                message: "retrieved successfully",
                tasks : tasks
            });
        });
    }

});



module.exports = router;