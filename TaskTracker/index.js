const args = process.argv.slice(2)
const command = args.at(0)
const options = args.slice(1)
const { addTask, loadTasks, deleteTask, updateTask } = require('./app')
const [title, description] = options

switch (command) {
  case 'add':
    addTask({ title, description })
    break
  case 'list':
    const tasks = loadTasks()
    console.table(tasks)
    break
  case 'delete':
    deleteTask(options.at(0))
    break
  case 'update':
    updateTask(options.at(0), { title, description })
    break
  default:
    console.log('Command not found', command)
    break
}