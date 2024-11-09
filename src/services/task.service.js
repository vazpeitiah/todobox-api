const Task = require('../models/task.model')

class TaskService {
  async create(task) {
    const user = new Task(task)
    return user.save()
  }

  async getAll() {
    return Task.find()
  }

  async getById(id) {
    return Task.findById(id)
  }

  async update(id, task) {
    return Task.findByIdAndUpdate(id, task)
  }

  async delete(id) {
    return Task.findByIdAndDelete(id)
  }
}

module.exports = TaskService
