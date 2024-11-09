const TaskService = require('../services/task.service')
const taskService = new TaskService()

class TaskController {
  async create(req, res) {
    try {
      console.log({ req: req.params })
      const user = await taskService.create(req.body)
      return res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getAll(_req, res) {
    try {
      const users = await taskService.getAll()
      return res.status(200).json(users)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getById(req, res) {
    try {
      const user = await taskService.getById(req.params.id)
      return res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const user = await taskService.update(req.params.id, req.body)
      return res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete(req, res) {
    try {
      await taskService.delete(req.params.id)
      return res.status(204).send()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

module.exports = TaskController
