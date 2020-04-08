var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

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

         // ****** create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

        // ****** give it a class name
    taskInfoEl.className = "task-info";
    
        // ****** add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

        // ****** add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

    // ****** Event Listener
formEl.addEventListener("submit", taskFormhandler); {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = taskNameInput;
}
