    // ****** Global Variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;


    // ****** Form Handler
var taskFormhandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
        // ****** check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!")
      return false;
    }
  
    formEl.reset();
  
        // ****** package update as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
    
        // ****** Send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
} 

// ****** Create task Element
var createTaskEl = function(taskDataObj) {
      // ****** create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
      // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
      // ****** create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
      // ****** give it a class name
    taskInfoEl.className = "task-info";
      // ****** add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    
      // ****** add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
      // ****** increase task counter for next id
    taskIdCounter++;
};

// ****** Create Task Action
var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  
    // ****** Create Edit Buttton
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  
  actionContainerEl.appendChild(editButtonEl);
  
    // ****** Create Delete Button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  
  actionContainerEl.appendChild(deleteButtonEl);
  
    // ****** Create Select Element
  var statusSelectEl - document.createElement("select");
  statusSelectEl.classname = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  
  actionContainerEl.appendChild(statusSelectEl);
  
  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0, 1 < statusChoices.length, i++) {
      // Create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.sstAttribute("value", statusChoices[i]);
    
    statusSelectEl.appendChild(statusOptionEl);
  };
  
  return actioncontainerEl;
};

// ****** Event Listener
formEl.addEventListener("submit", taskFormhandler); {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = taskNameInput;
}
