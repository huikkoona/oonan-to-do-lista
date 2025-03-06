document.addEventListener("DOMContentLoaded", function() {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // tapahtumakuuntelijat what ever they are :D
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // tehtävän lisääminen
    function addTask() {
        let taskText = taskInput.value.trim();
        
        if (taskText === "") {
            alert("Tehtävä ei voi olla tyhjä!");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <div class="checkbox-container">
                <input type="checkbox" onclick="toggleTask(this)">
                <span>${taskText}</span>
            </div>
            <div>
                <button onclick="deleteTask(this)">✖</button>
            </div>
        `;

        //tehtävän tallennusta yms
        taskList.appendChild(taskItem);
        saveTasks(); 
        taskInput.value = ""; 
    }

    // tehtävän merkitseminen tehdyksi
    function toggleTask(checkbox) {
        const taskItem = checkbox.parentElement.parentElement;
        if (checkbox.checked) {
            taskItem.classList.add("completed"); 
        } else {
            taskItem.classList.remove("completed");
        }
        saveTasks(); // Tallenna tehtävät
    }

    // tallentaminen localStorageen
    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#taskList li").forEach(task => {
            tasks.push({
                text: task.querySelector("span").innerText,
                completed: task.querySelector("input[type='checkbox']").checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
    }

    // lataaminen localStoragesta
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <div class="checkbox-container">
                    <input type="checkbox" onclick="toggleTask(this)" ${task.completed ? 'checked' : ''}>
                    <span>${task.text}</span>
                </div>
                <div>
                    <button onclick="deleteTask(this)">✖</button>
                </div>
            `;
            if (task.completed) {
                taskItem.classList.add("completed"); // jos valmis, lisää "completed" luokka
            }
            taskList.appendChild(taskItem);
        });
    }

    // lataa tehtävät, jos ne on tallennettu
    loadTasks(); 
});
