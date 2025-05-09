const addListBtn = document.getElementById("addListBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [];
let counter = 0;

addListBtn.addEventListener("click", addTask);

function addTask() {
  const name = taskInput.value.trim();
  if (!name) return;

  tasks.push({ id: counter++, name, done: false });
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
          <span style="text-decoration: ${
            task.done ? "line-through" : "none"
          };">${task.name}</span>
          <div>
            <button class="btn btn-sm btn-outline-success me-2 toggle-btn" data-index="${index}">Toggle</button>
            <button class="btn btn-sm btn-outline-danger delete-btn" data-index="${index}">Delete</button>
          </div>
        `;

    taskList.appendChild(li);
  });

  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => toggleTask(btn.dataset.index));
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => deleteTask(btn.dataset.index));
  });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Monitor if all tasks are done every 10s
setInterval(() => {
  if (tasks.length && tasks.every((t) => t.done)) {
    console.log("All tasks done!");
  }
}, 10000);
