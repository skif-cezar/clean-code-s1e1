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


//Delete task.
const deleteTask = function(){
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted = function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function(){
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest = function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
//select ListItems children
  const checkBox = taskListItem.querySelector("input[type = checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}