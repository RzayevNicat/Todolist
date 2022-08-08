// Element olusturma
//  let newLink= document.createElement("a");
//  let cardBody = document.getElementsByClassName("card-body")[1];

// newLink.id = "clear-todos";
// newLink.className ="btn btn-dark";
// newLink.href = "https://www.xnxx.com";
// newLink.target = "_blank";
// newLink.appendChild(document.createTextNode("diger site"));

// cardBody.appendChild(newLink)

// const cardBody = document.querySelectorAll(".card-body")[1];



// cardBody.addEventListener("click",run)
// cardBody.addEventListener("click",Alldelete)

// function run(b) {
//     if (b.target.className === "fa fa-remove") {
//         b.target.parentElement.parentElement.remove();
    
// }
// }
// function Alldelete(b) {
//     if(b.target.className ==="btn btn-dark"){
//         b.target.
//     }
    
// }
// cardBody.addEventListener("click",run)

// function run(e) {
//     console.log(e)
    
// }
// PROJECT
// const firstCardBody = document.querySelectorAll(".card-body")[0];
// const todoİnput = document.querySelector("#todo")
// const form = document.querySelector("#todo-form")
// const listGroup = document.querySelector(".list-group")
// evventListeners();
// function evventListeners(e) {
//     form.addEventListener("submit",addTodo)
    
// }

// function addTodo(e) {
//     const newTodo = todoİnput.value.trim();
//     if (newTodo===""){
//         showAlert("danger","Zehmet olmasa todo girin...")
//     }
//     else{
//         addTodoUI(newTodo);
//         showAlert("success","Todo basariyla girildi...")
//     }
    
    

//     e.preventDefault();
// }
// function showAlert(type,message) {
//     const alert = document.createElement("div");

//     alert.className=`alert alert-${type}`;
//     alert.textContent= message
    
//     firstCardBody.appendChild(alert)

//     setTimeout(function(){
//         alert.remove();
//     },500)
    
// }
// function addTodoUI(newTodo) {
// //      <li class="list-group-item d-flex justify-content-between">
// //     Todo 1
// //     <a href = "#" class ="delete-item">
// //         <i class = "fa fa-remove"></i>
// //     </a>

// // </li> 
//     const listItem = document.createElement("li");
//     const newLink = document.createElement("a");

//     // li olusturma
//     listItem.className = "list-group-item d-flex justify-content-between";

//     // link olusturma
//     newLink.href="#";
//     newLink.className="delete-item";
//     newLink.innerHTML="<i class = 'fa fa-remove'></i>"

//     listItem.appendChild(document.createTextNode(newTodo));
//     listItem.appendChild(newLink);

//     listGroup.appendChild(listItem);
    
// }
// PROJECT 2

const cardBody1 = document.querySelectorAll(".card-body")[0];
const todoInput = document.querySelector("#todo");
const form = document.querySelector("#todo-form");
const listGroup = document.querySelector(".list-group");
const cardBody2 = document.querySelectorAll(".card-body")[1];
const formRow = document.querySelector(".form-row");
const filter = document.querySelector("#filter");
const clearAllTodos = document.querySelector("#clear-todos");

eventListener();
function eventListener(e) {
    form.addEventListener("submit",addTodo);
    cardBody2.addEventListener("click",deleteTodo);
    document.addEventListener("DOMContentLoaded",addTodoStorage)
    filter.addEventListener("keyup",filterTodo)
    clearAllTodos.addEventListener("click",deleteAllTodos)
    
}
function addTodoStorage() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoUI(todo);
        
    })
    
}
function addTodo(e) {
    value = todoInput.value;
    if (value===""){
        showAlert("danger","Lutfen bir todo girin:(")
    } 
    else{
        addTodoUI(value)
        addTodoLocalStorage(value);
        showAlert("success","Todo basariyla girildi:)")
       
    }
    
    e.preventDefault();
}
function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    return todos;
}
function addTodoLocalStorage(value) {
    let todos = getTodosFromStorage(value);
    todos.push(value);

    localStorage.setItem("todos",JSON.stringify(todos));

}
function addTodoUI(value) {
    //  <li class="list-group-item d-flex justify-content-between">
    // Todo 1
    // <a href = "#" class ="delete-item">
    //     <i class = "fa fa-remove"></i>
    // </a>

    // </li> 
    const newElement = document.createElement("li");
    newElement.className="list-group-item d-flex justify-content-between";
    newElement.textContent= value;
    const newLink = document.createElement("a");
    newLink.href="#";
    newLink.className="delete-item";
    newLink.innerHTML="<i class = 'fa fa-remove'></i>"
    newElement.appendChild(newLink);
    listGroup.appendChild(newElement);
    todoInput.value="";
    
}
function showAlert(type,message) {
    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    cardBody1.appendChild(alert)
    setTimeout(function () {
        alert.remove();
        
    },2000)

    
}
function deleteTodo(e) {
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }
    
}

function deleteTodoFromStorage(deleteTodos) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo,index) {
        if (todo === deleteTodos) {
            todos.splice(index,1)
            
        }
        localStorage.setItem("todos",JSON.stringify(todos))
    })
    
}
function filterTodo(e) {
    let filterValue = e.target.value.toLowerCase();
    let listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listitem) {
        let text = listitem.textContent.toLowerCase();
        if (text.indexOf(filterValue)=== -1) {
            listitem.setAttribute("style","display: none !important")
            
        }
        else{
            listitem.setAttribute("style","display: block")
        }
        
    })
    
}
function deleteAllTodos(e) {
    if (confirm("Butun todolari silmeye eminsiniz???")){
        while (listGroup.firstElementChild !=null) {
            listGroup.removeChild(listGroup.firstElementChild);
            
        }
        localStorage.removeItem("todos");
    }
    
}
// function deleteAllTodos(e) {
//     if(e.target.className==="btn btn-dark"){
//         listGroup.remove();
//         const newList = document.createElement("ul");
//         newList.className="list-group";
//         formRow.nextSibling(newList);

//     }
    
// }

