// fetching elements
var form = document.getElementById("new-task-form");
var input = document.getElementById("new-task-input");
var tasks = document.getElementById("tasks");
var taskCount = document.getElementById("task-count");

// Event listener for Form Submisssion
form.addEventListener("submit", function (event) {
  event.preventDefault();

  var text = input.value;
  input.value = "";

  if (text) {
    var task = createTask(text);
    tasks.appendChild(task);
    updateCount();
  } else {
    alert("Please enter a task."); //show an alert if the task is empty
  }
});

// Create task  function
function createTask(text) {
  var task = document.createElement("div");
  task.className = "task";

  var content = document.createElement("div");
  content.className = "content";

  var taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.className = "text";
  taskInput.value = text;
  taskInput.readOnly = true;
  content.appendChild(taskInput);

  var actions = document.createElement("div");
  actions.className = "actions";

  // Add Edit button to the task
  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";
  actions.appendChild(editButton);

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "edit";

// Add functionality for edit button
  editButton.addEventListener('click', (e) => {
    const button = e.target;  
    const taskInput = button.parentElement.parentElement.querySelector('.text');
    
    if (button.innerText.toLowerCase() === "edit") {
        button.innerText = "Save";
        taskInput.removeAttribute("readonly");
        taskInput.focus();
    } else {
        button.innerText = "Edit";
        taskInput.setAttribute("readonly", "readonly");
        taskInput.setAttribute('data-edited', 'true');  // Mark the task as edited
    }
    updateCount();
});



  //Add functionality for delete button
  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", function () {
    tasks.removeChild(task);
    updateCount();
  });
  actions.appendChild(deleteButton);

  task.appendChild(content);
  task.appendChild(actions);

  return task;
}
// this function updates the displayed task count
function updateCount() {
  var count = tasks.getElementsByClassName("task").length;
  var editedCount = tasks.querySelectorAll('input[data-edited="true"]').length;  // Count edited tasks
  

  taskCount.innerText = count + " tasks, " + editedCount + " edited, ";
  // if there is no task in the list
  if (count === 0) {
      alert("All tasks have been deleted.");
  }
}

