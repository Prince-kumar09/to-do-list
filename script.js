const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  createTaskElement(text, false);
  saveTaskToLocal(text, false);

  taskInput.value = "";
  taskInput.focus();
}

function createTaskElement(text, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "✓";
  toggleBtn.className = "toggle-btn";
  toggleBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskInLocal(text);
  });

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTaskFromLocal(text);
  });

  li.appendChild(toggleBtn);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

// LocalStorage helpers

function getTasksFromLocal() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTaskToLocal(text, completed) {
  const tasks = getTasksFromLocal();
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasksFromLocal();
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function updateTaskInLocal(text) {
  const tasks = getTasksFromLocal();
  const index = tasks.findIndex(t => t.text === text);
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function removeTaskFromLocal(text) {
  const tasks = getTasksFromLocal();
  const filtered = tasks.filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(filtered));
}