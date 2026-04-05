let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-top">
                <span>${task.text}</span>
                <div class="task-actions">
                    <button onclick="toggleComplete(${index})">✔</button>
                    <button onclick="editTask(${index})">✏</button>
                    <button onclick="deleteTask(${index})">❌</button>
                </div>
            </div>
            <small>${task.date || ""} ${task.time || ""}</small>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const text = document.getElementById("taskInput").value;
    const date = document.getElementById("taskDate").value;
    const time = document.getElementById("taskTime").value;

    if (text.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text,
        date,
        time,
        completed: false
    });

    saveTasks();
    renderTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks();
