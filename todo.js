function addTask() {
    let taskInput = document.getElementById("task");
    let descInput = document.getElementById("desc");
    let taskValue = taskInput.value.trim();
    let descValue = descInput.value.trim();

    if (taskValue === "") return;

    let now = new Date();
    let waktu = now.toLocaleString('id-ID');

    let li = document.createElement("li");
    li.innerHTML = `
        <div>
            <strong onclick="toggleTask(this)">${taskValue}</strong><br>
            <small>${descValue}</small><br>
            <small>${waktu}</small>
        </div>
        <button onclick="removeTask(this)">❌</button>
    `;
    document.getElementById("task-list").appendChild(li);

    taskInput.value = "";
    descInput.value = "";

    saveTasks(); // simpan setelah menambah
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks(); // simpan setelah menghapus
}

function toggleTask(span) {
    span.classList.toggle("completed");
    saveTasks(); // simpan setelah toggle
}

function filterTasks(type) {
    let tasks = document.querySelectorAll("#task-list li");
    tasks.forEach(task => {
        let isCompleted = task.querySelector("strong").classList.contains("completed");
        if (type === "all") {
            task.style.display = "flex";
        } else if (type === "pending" && isCompleted) {
            task.style.display = "none";
        } else if (type === "completed" && !isCompleted) {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        const title = li.querySelector("strong").textContent;
        const desc = li.querySelectorAll("small")[0].textContent;
        const time = li.querySelectorAll("small")[1].textContent;
        const isCompleted = li.querySelector("strong").classList.contains("completed");

        tasks.push({ title, desc, time, isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong onclick="toggleTask(this)" class="${task.isCompleted ? 'completed' : ''}">${task.title}</strong><br>
                <small>${task.desc}</small><br>
                <small>${task.time}</small>
            </div>
            <button onclick="removeTask(this)">❌</button>
        `;
        document.getElementById("task-list").appendChild(li);
    });
}

// Panggil saat halaman pertama kali dibuka
window.addEventListener("load", loadTasks);