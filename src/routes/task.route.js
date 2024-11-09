const { Router } = require('express')
const TaskController = require('../controllers/task.controller')

const router = Router()
const taskController = new TaskController()

router.get('/', taskController.getAll)
router.post('/', taskController.create)
router.get('/:id', taskController.getById)
router.put('/:id', taskController.update)
router.delete('/:id', taskController.delete)

module.exports = router
