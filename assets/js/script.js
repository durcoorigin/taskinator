var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
//      console.dir(taskNameInput);
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item"; 
    listItemEl.textContent = tasknameInput;
    tasksToDoEl.appendChild(listItemEl);
//    console.log(event);
} 

formEl.addEventListener("submit", createTaskHandler); {
   
    // ****** Create list item 
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
    
    // ****** Create div to hold task info and add list item
  var taskInfoEl = createElement("div");
    
    // ****** Give it a class name
  taskInfoEl.className = "task-info";
    
    // ****** add HTML contant to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
      
  listItemEl.appendChild(taskInfoEl);
    
    // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
};




console.log("buttonEl");
