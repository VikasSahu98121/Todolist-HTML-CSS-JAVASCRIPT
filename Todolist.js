const Element = document.querySelector(".todoadditem");
const input = document.getElementById("input");
const btn = document.querySelector(".btn");

const getTodolist = () => {
    return JSON.parse(localStorage.getItem("youtube")) || [];
}

const addtodolistlocalstorage = (localTodolist) => {
    localStorage.setItem('youtube', JSON.stringify(localTodolist));
}

let localTodolist = getTodolist();

const addTodoDynamicElement = (curElem) => {
    const divelement = document.createElement("div");
    divelement.classList.add("main_todo_div");
    divelement.innerHTML = `
        <span>${curElem}</span>
        <button class="delete_btn" aria-label="Delete todo">Delete</button>
    `;
    Element.appendChild(divelement);
}

const addtodolist = (e) => { 
    e.preventDefault();
    const todolistvalue = input.value.trim();
    if (todolistvalue !== "" && !localTodolist.includes(todolistvalue)) {
        localTodolist.push(todolistvalue);
        localTodolist = [...new Set(localTodolist)];
        addtodolistlocalstorage(localTodolist);
        addTodoDynamicElement(todolistvalue);
    }
    input.value = "";
}

const showTodolist = () => {
    Element.innerHTML = ""; // pehle clear kardo
    localTodolist.forEach((curElem) => {
        addTodoDynamicElement(curElem);
    });
}

showTodolist();

const removeTodoelement = (e) => {
    if (e.target.classList.contains("delete_btn")) {
        const parentelement = e.target.parentElement;
        const todolistcontent = parentelement.querySelector("span").innerText.trim();
        localTodolist = localTodolist.filter((curTodo) => curTodo !== todolistcontent);

        addtodolistlocalstorage(localTodolist);
        parentelement.remove();
    }
}

Element.addEventListener("click", removeTodoelement);
btn.addEventListener("click", addtodolist);
