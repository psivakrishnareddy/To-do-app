//TO DO LIST APP DONE BY P SIVA KRISHNA REDDY OF R.M.K CET B.E CSE

// DEFINE UI VARISBLES
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load events
loadEventListners();

//load EVENT LISTNER
function loadEventListners() {
  //form add listner
  form.addEventListener("submit", addTask);
  clearBtn.addEventListener("click", clearTasks);

  //remove button task
  taskList.addEventListener("click", removeTask);

  // LOAD FROM LS ON START
  document.addEventListener("DOMContentLoaded", getTasks);

  //filer event
  filter.addEventListener("keyup", filterTasks);
}
// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach(function(task) {
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement("a");
      // Add class
      link.className = "delete-item secondary-content";
      // Add icon html
      link.innerHTML = '<button class="fa fa-remove"></button>';
      // Append the link to li
      li.appendChild(link);

      // Append li to ul
      taskList.appendChild(li);
    });
  }
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<button class="fa fa-remove"></button>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    storetoLocal(taskInput.value);
    // Clear input
    taskInput.value = "";
  }
  e.preventDefault();
}
// Store IN LS
function storetoLocal(task) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear entire list

function clearTasks() {

if(confirm("Delete Entire List??")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    clearFromLocal();
  }
}
function clearFromLocal() {
  localStorage.clear();
}

// Remove Tasks
function removeTask(e) {
	console.log(e.target);
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    removeFromLocal(e.target.parentElement.parentElement);
  }
}

// Remove from LS
function removeFromLocal(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    console.log(task, taskItem.firstChild.nodeValue);
    if (taskItem.firstChild.nodeValue == task.toString()) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// FILTER TASKS
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll(".collection-item");
  tasks.forEach(function(task) {
    const item = task.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
