const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = [];

button.addEventListener("click",function(){
    const taskText = input.value;

    if(taskText==="") return;

    tasks.push(taskText);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    addTaskToUI(taskText);

    input.value = "";

});

function addTaskToUI(taskText){
    const li = document.createElement("li");
    li.textContent=taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click",function(){
        li.remove();

        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks",JSON.stringify(tasks));
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
}

window.addEventListener("load",function(){
    const storedTasks=localStorage.getItem("tasks");

    if(storedTasks){
        tasks = JSON.parse(storedTasks);

        tasks.forEach(task => {
            addTaskToUI(task);
        });
    }
});