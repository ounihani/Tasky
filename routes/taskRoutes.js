const express = require('express');
const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */


/**
 * @swagger
 * /create_account:
 *   post:
 *     description: This creates an acount for a Task 
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

router.post('/Task', (res,req)=>{

});


 
module.exports = router;
