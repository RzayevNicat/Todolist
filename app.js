const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const form = document.querySelector('#todo-form');
const listGroup = document.querySelector('.list-group');
const todoInput = document.querySelector('#todo');
const filter = document.querySelector('#filter');
const clearTodos = document.querySelector('#clear-todos');

eventListeners();

function eventListeners(e) {
	firstCardBody.addEventListener('submit', addTodo);
	document.addEventListener('DOMContentLoaded', loadAllTodos);
	secondCardBody.addEventListener('click', removeTodo);
	filter.addEventListener('keyup', filterTodos);
	clearTodos.addEventListener('click', clearrTodos);
}

function addTodo(e) {
	let newTodo = todoInput.value;
	let todos = getTodoFromStorage();
	if (newTodo.trim() === '') {
		showAlert('danger', 'Bir Todo girin:(');
	} else if (todos.indexOf(newTodo) === 0) {
		showAlert('danger', 'Bu Todo Zaten Kayıtlı');
	} else {
		addTodoUI(newTodo);
		addTodoStorage(newTodo);
		showAlert('success', 'Todo Ugurla girildi:)');
	}
	todoInput.value = '';

	e.preventDefault();
}

function addTodoUI(newTodo) {
	let newelement = document.createElement('li');
	newelement.className = 'list-group-item d-flex justify-content-between';
	newelement.textContent = newTodo;
	let newLink = document.createElement('a');
	newLink.href = '#';
	newLink.className = 'delete-item';
	newLink.innerHTML = "<i class = 'fa fa-remove'></i>";
	newelement.appendChild(newLink);
	listGroup.appendChild(newelement);
}

function showAlert(type, message) {
	let newDiv = document.createElement('div');
	newDiv.className = `alert alert-${type}`;
	newDiv.textContent = message;
	firstCardBody.appendChild(newDiv);
	setTimeout(function() {
		newDiv.remove();
	}, 2000);
}

function getTodoFromStorage() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	return todos;
}
function addTodoStorage(newtodo) {
	let todos = getTodoFromStorage(newtodo);
	todos.push(newtodo);
	localStorage.setItem('todos', JSON.stringify(todos));
}
function loadAllTodos() {
	let todos = getTodoFromStorage();
	todos.forEach(function(todo) {
		addTodoUI(todo);
	});
}
function removeTodo(e) {
	if (e.target.className === 'fa fa-remove') {
		e.target.parentElement.parentElement.remove();
		deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
	}
}

function deleteTodoFromStorage(deletetodo) {
	let todos = getTodoFromStorage();
	todos.forEach(function(todo, index) {
		if (todo === deletetodo) {
			todos.splice(index, 1);
		}
		localStorage.setItem('todos', JSON.stringify(todos));
	});
}
function filterTodos(e) {
	let filterValue = e.target.value.toLowerCase();
	console.log(filterValue);
	const listItems = document.querySelectorAll('.list-group-item');

	listItems.forEach(function(listItem) {
		let text = listItem.textContent.toLowerCase();
		if (text.indexOf(filterValue) === -1) {
			listItem.setAttribute('style', 'display: none !important');
		} else {
			listItem.setAttribute('style', 'display: block');
		}
	});
}
function clearrTodos(e) {
	if (confirm('Butun Todolari silmeye eminsiniz?:)')) {
		while (listGroup.firstElementChild != null) {
			listGroup.removeChild(listGroup.firstElementChild);
			localStorage.removeItem('todos');
		}
	}
}
