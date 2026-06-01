
const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const counter = document.getElementById("taskCounter");

let tasks = [];


window.addEventListener("load", () => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks(tasks);
    }
});


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    

    if (taskText.length < 3) {
        errorMessage.textContent =
            "Tehtävän tulee sisältää vähintään 3 merkkiä.";

        taskInput.classList.add("error");
        return;
    }

    errorMessage.textContent = "";
    taskInput.classList.remove("error");

    const task = {
        id: Date.now(),
        text: taskText,
        priority: prioritySelect.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks(tasks);

    form.reset();
});


function renderTasks(taskArray) {
    taskList.innerHTML = "";

    taskArray.forEach(task => {

        const li = document.createElement("li");
        li.classList.add("task-item");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-info">
                <strong>${task.text}</strong>
                <span class="priority">
                    Prioriteetti: ${task.priority}
                </span>
            </div>

            <div class="task-buttons">
                <button onclick="toggleTask(${task.id})">
                    ${task.completed ? "Peruuta" : "Valmis"}
                </button>

                <button onclick="deleteTask(${task.id})">
                    Poista
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateCounter();
}


function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    renderTasks(tasks);
}



function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks(tasks);
}


function updateCounter() {
    const activeTasks =
        tasks.filter(task => !task.completed).length;

    counter.textContent =
        `Avoimia tehtäviä: ${activeTasks}`;
}


function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}



document
.getElementById("showAll")
.addEventListener("click", () => {
    renderTasks(tasks);
});

document
.getElementById("showActive")
.addEventListener("click", () => {

    const active =
        tasks.filter(task => !task.completed);

    renderTasks(active);
});

document
.getElementById("showCompleted")
.addEventListener("click", () => {

    const completed =
        tasks.filter(task => task.completed);

    renderTasks(completed);
});
