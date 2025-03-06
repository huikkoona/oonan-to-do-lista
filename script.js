script.js

document.addEventListener("DOMContentLoaded", loadTasks);

const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    let taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Tehtävä ei voi olla tyhjä!");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button onclick="completeTask(this)">✔</button>
            <button onclick="deleteTask(this)">✖</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    saveTasks();
    taskInput.value = "";
}

function completeTask(button) {
    let taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle("completed");
    saveTasks();
}

function deleteTask(button) {
    let taskItem = button.parentElement.parentElement;
    taskItem.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").innerText,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="completeTask(this)">✔</button>
                <button onclick="deleteTask(this)">✖</button>
            </div>
        `;
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskList.appendChild(taskItem);
    });
}
