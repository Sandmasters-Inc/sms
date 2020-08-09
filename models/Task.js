import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  createUser: {
    type: 'ObjectId',
    ref: 'User'
  },
  assignedUser: {
    type: 'ObjectId',
    ref: 'User'
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  completeDate: {
    type: Date,
    default: Date.now
  }
})

const Task = mongoose.model('task', TaskSchema)

export default Task