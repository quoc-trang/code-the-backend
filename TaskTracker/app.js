const fs = require('fs')
const filePath = './tasks.json'

function loadTasks(){
    const data = fs.readFileSync(filePath, 'utf8')
    
    const isDataEmpty = data.trim() === ''
    if(isDataEmpty) return []

    return JSON.parse(data)
}

function saveTasks(tasks){
    const data = JSON.stringify(tasks, null, 2)
    fs.writeFileSync(filePath, data, 'utf8')
}

function addTask(task){
    if(typeof task !== 'object' || !task.title || !task.description){
        console.log('Task should have title and description');
        process.exit(1)
    }
    
    const newTask = {
        id: Date.now().toString(36),
        ...task,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    const currentTasks = loadTasks()
    currentTasks.push(newTask)
    saveTasks(currentTasks)
    console.log('Task added successfully');
}

function deleteTask(taskId){
    if(!taskId) {
        console.log('task id is required to delete')
        process.exit()
    }

    const currentTasks = loadTasks()
    const findIndex = currentTasks.findIndex(task => task.id === taskId)
    if(findIndex === -1){
        console.log('Can not find task with that id')
        process.exit(1)
    }

    currentTasks.splice(findIndex, 1)
    saveTasks(currentTasks)
    console.log('Task was deleted successfully');
}

function updateTask(taskId, task){
    if(!taskId) {
        console.log('task id is required to update')
        process.exit(1)
    }

    if(!task){
        console.log('title or description is required to update')
        process.exit(1)
    }

    const currentTasks = loadTasks()
    const tasksUpdated = currentTasks.map(item => {
        if(item.id === taskId){
            return {
                ...item,
                ...task
            }
        }else{
            return item
        }
    })

    saveTasks(tasksUpdated)
    console.log('Task updated successfully');
}

module.exports = {addTask, loadTasks, deleteTask, updateTask}