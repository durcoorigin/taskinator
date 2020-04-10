    // ****** Global Variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];

    // ****** Form Handler
var taskFormHandler = function(event) {
//    debugger;
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
        // ****** check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!")
      return false;
    }
  
    formEl.reset();
  
    var isEdit = formEl.hasAttribute("data-task-id");
    
    if (isEdit) {
      var taskId=formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
  
    else{
          // ****** package update as an object
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
      }
    
            // ****** Send it as an argument to createTaskEl
      createTaskEl(taskDataObj);
    }
} 

var completeEditTask = function(taskName, taskType, taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  
  alert("Task Updated!");
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
}

// ****** Create task Element
var createTaskEl = function(taskDataObj) {
      // ****** create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
      // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true");
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

    console.log(taskDataObj);
    console.log(taskDataObj.status)
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
  var statusSelectEl = document.createElement("select");
  statusSelectEl.classname = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  
  actionContainerEl.appendChild(statusSelectEl);
  
  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
      // Create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
    
    statusSelectEl.appendChild(statusOptionEl);
  };
  
  return actionContainerEl;
};


// ****** delete and edit button function
var taskButtonHandler = function(event) {
  console.log(event.target);
  var targetEl = event.target;

    // ****** Edit buton clicked
  if(targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }

    // ****** delete button clicked
  else if (targetEl.matches(".delete-btn")) {
      // ****** get the elements task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);

    console.log(taskId);
  }
};

// ****** Delete button
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
  console.log(taskSelected);
}

// ****** Edit button
var editTask = function(taskId) {

    // ****** get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // ****** get content from task name
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", + taskId);
}

// ****** Change Task Status
var taskStatusChangeHandler = function(event) {
  var taskId = event.target.getAttribute("data-task-id");
  var statusValue = event.target.value.toLowerCase();
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  if (statusValue === "to do"){
    tasksToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  }
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  
};


// Drag and Drop event function
var dragTaskHandler = function(event) {
  var taskId = event.target.getAttribute("data-task-id");
  event.dataTransfer.setData("text/plain", taskId);
  var getId = event.dataTransfer.getData("text/plain");
  console.log("getId:", getId, typeof getId);
} 

var dropZoneDragHandler = function(event) {
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    event.preventDefault();
    console.dir(taskListEl);
  }
};

var dropTaskHandler = function(event) {
  var id = event.dataTransfer.getData("text/plain");
  var draggableElement = document.querySelector("[data-task-id='" + id +"']");
  var dropZoneEl = event.target.closest(".task-list");
  var statusType = dropZoneEl.id;
  var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    
    if (statusType === "tasks-to-do") {
      statusSelectEl.selectedIndex = 0;
    } 
    else if (statusType === "tasks-in-progress") {
      statusSelectEl.selectedIndex = 1;
    } 
    else if (statusType === "tasks-completed") {
      statusSelectEl.selectedIndex = 2;
    }

    dropZoneEl.appendChild(draggableElement);
};

// ****** Event Listeners
formEl.addEventListener("submit", taskFormHandler); {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = name;
};

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
