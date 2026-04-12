const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = [];

button.addEventListener("click",function(){
    const taskText = input.value;

    if(taskText==="") return;

    const taskObj = {
        id : Date.now(),
        text : taskText,
        completed : false
    };

    tasks.push(taskObj);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    addTaskToUI(taskObj);

    input.value = "";

});

function addTaskToUI(task){
    const li = document.createElement("li");
    li.textContent=task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click",function(){
        li.remove();

        tasks = tasks.filter(t => t.id !== task.id);
        localStorage.setItem("tasks",JSON.stringify(tasks));
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);

    li.addEventListener("click",function(){
        task.completed = !task.completed;

        if(task.completed){
            li.style.textDecoration = "line-through";
        }else{
            li.style.textDecoration = "none";
        }
        localStorage.setItem("tasks",JSON.stringify(tasks));
    });

    if(task.completed){
        li.style.textDecoration = "line-through";
    }
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