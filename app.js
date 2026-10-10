// DOM Elements
const taskInput = document.getElementById("new-task");
const addButton = document.querySelector('.todo-app__button--add');
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");


// Helper: Create element with classes and attributes
const createElement = (tag, className, attributes = {}) => {
  const element = document.createElement(tag);
  if (className) element.className = className;

    for (const [key, value] of Object.entries(attributes)) {
    element[key] = value;
    }

    return element;
};

// Create a new task list item adhering to BEM structure
const createNewTaskElement = (taskString) => {
  const listItem = createElement('li', 'todo-app__task-item');

  const checkBox = createElement('input', 'todo-app__checkbox', { type: 'checkbox' });

  const label = createElement('label', 'todo-app__task-text');
  label.textContent  = taskString;

  const editInput = createElement('input', 'todo-app__input todo-app__input--edit', { type: 'text' });

  const editButton = createElement('button', 'todo-app__button todo-app__button--edit', { type: 'button' });
  editButton.textContent  = 'Edit';

  const deleteButton = createElement('button', 'todo-app__button todo-app__button--delete', { type: 'button' });
  
  const deleteButtonImg = createElement('img', 'todo-app__button-icon', { 
            src: './remove.svg', 
            alt: 'Delete task' 
        });
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
        
  return listItem;
}

// Add a new task
const addTask = (event) => {
  event.preventDefault();
  
  const taskText = taskInput.value.trim();
  
  if (!taskText) return;

  const listItem = createNewTaskElement(taskText);
  
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

// Edit an existing task
const editTask = function() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.todo-app__input--edit');
  const label = listItem.querySelector('.todo-app__task-text');
  const editBtn = listItem.querySelector('.todo-app__button--edit');
  const isEditMode = listItem.classList.contains('todo-app__task-item--edit-mode');

  if (isEditMode) {
    label.textContent = editInput.value;
    editBtn.textContent = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.textContent = 'Save';
  }

  listItem.classList.toggle('todo-app__task-item--edit-mode');
};

// Delete a task
const deleteTask = function() {
  const listItem = this.parentNode;
  listItem.remove();
};

// Mark task as completed
  const taskCompleted = function() {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

// Mark task as incomplete
const taskIncomplete = function() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// Bind event listeners to task item children
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  const checkBox = taskListItem.querySelector('.todo-app__checkbox');
  const editButton = taskListItem.querySelector('.todo-app__button--edit');
  const deleteButton = taskListItem.querySelector('.todo-app__button--delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

// Event Listeners for adding tasks
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask(e);
});

// Initialize events for existing tasks on load
Array.from(incompleteTaskHolder.children).forEach((listItem) => {
  bindTaskEvents(listItem, taskCompleted);
});

Array.from(completedTasksHolder.children).forEach((listItem) => {
  bindTaskEvents(listItem, taskIncomplete);
});