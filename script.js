const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

button.addEventListener("click",function(){
    const taskText = input.value;

    if(taskText==="") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText="Delete";
    
    deleteBtn.addEventListener("click",function(){
        li.remove();
    })
    
    list.appendChild(li);
    li.appendChild(deleteBtn);

    input.value = "";

});

