
// Define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all even listeners
loadEventListeners();
// Load all even listeners
function loadEventListeners() {
  // DOM load event 
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask)
  // Remove task event
  taskList.addEventListener('click', removeTask)
  // Clear tasks
  clearBtn.addEventListener('click', clearTasks)
  // Filter task event 
  filter.addEventListener('keyup', filterTasks)
}
// Get tasks from LocalStorage 
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    // LocalStorage only accepts strings
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function (task) {
    // Create li element 
    const li = document.createElement('li')
    // Add class
    li.className = 'collection-item'
    // Create text node and append to li
    li.appendChild(document.createTextNode(task))
    // Create link element
    const link = document.createElement('a')
    // Add class
    link.className = 'delete-item secondary-content'
    // Create icon
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append link to li
    li.appendChild(link)
    // Append li to UL
    taskList.appendChild(li)
  })
}
// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task')
  }
  // Create li element 
  const li = document.createElement('li')
  // Add class
  li.className = 'collection-item'
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))
  // Create link element
  const link = document.createElement('a')
  // Add class
  link.className = 'delete-item secondary-content'
  // Create icon
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append link to li
  li.appendChild(link)
  // Append li to UL
  taskList.appendChild(li)
  // Store in LocalStorage 
  storeTaskInLocalStorage(taskInput.value)
  // Clear input 
  taskInput.value = ''

  e.preventDefault()

}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    // LocalStorage only accepts strings
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  // Add to array
  tasks.push(task)
  // Store as string
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      // Remove from LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    // LocalStorage only accepts strings
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index) {
    // Check which task to remove
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// Clear tasks
function clearTasks() {
  // Slower
  // taskList.innerHTML = ''

  // Faster 
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
}
// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // Get all list items (node list) and filter
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != - 1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}
