let mongoose = require('mongoose');
// Post Schema
let TaskSchema = mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    required: true
  },
  candidate_email: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Task', TaskSchema);
