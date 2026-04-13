let currentFilter = "all";

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

    renderTasks();

    input.value = "";

});

function addTaskToUI(task){
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    const btnContainer = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    editBtn.addEventListener("click",function (e){
        e.stopPropagation();  //otherwise it triggers li click 

        const newText = prompt("Edit your task:",task.text);

        if(newText === null || newText.trim() === "") return;

        task.text = newText;

        localStorage.setItem("tasks",JSON.stringify(tasks));
        renderTasks();
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click",function(e){
        e.stopPropagation();
        tasks = tasks.filter(t => t.id !== task.id);
        localStorage.setItem("tasks",JSON.stringify(tasks));
        renderTasks();
    });

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnContainer);

    list.appendChild(li);

    li.addEventListener("click",function(){
        task.completed = !task.completed;

        localStorage.setItem("tasks",JSON.stringify(tasks));

        renderTasks();
    });

    if(task.completed){
        span.style.textDecoration = "line-through";
    }
}

function renderTasks(){
    list.innerHTML = ""; //clear UI

    let filteredTasks;

    if(currentFilter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }else if(currentFilter === "pending"){
        filteredTasks = tasks.filter(task => !task.completed);
    }else{
        filteredTasks=tasks;
    }

    filteredTasks.forEach(task => {
        addTaskToUI(task);
    });
}

document.getElementById("allBtn").addEventListener("click",function(){
    currentFilter = "all";
    renderTasks();
});

document.getElementById("completedBtn").addEventListener("click",function(){
    currentFilter = "completed";
    renderTasks();
});

document.getElementById("pendingBtn").addEventListener("click",function(){
    currentFilter = "pending";
    renderTasks();
});

document.getElementById("clearCompletedBtn").addEventListener("click",function(){

    tasks = tasks.filter(task => !task.completed);

    localStorage.setItem("tasks",JSON.stringify(tasks));
    
    renderTasks();
})

window.addEventListener("load",function(){
    const storedTasks=localStorage.getItem("tasks");

    if(storedTasks){
        tasks = JSON.parse(storedTasks);

        renderTasks();
        
    }
});