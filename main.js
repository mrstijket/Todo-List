const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name: 'Make Dinner',
    dueDate: '2023-05-26'
}, {
    name: 'Wash Dishes',
    dueDate: '2023-05-26'
}];

renderTodoList();

function renderTodoList() {

    let todoListHtml = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;
        const { name, dueDate } = todoObject;
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button onclick="
                todoList.splice(${i}, 1);
                renderTodoList();
                saveToStorage();
            " class="delete-todo-button">Delete</button>
        `; //generating the html
        todoListHtml += html;
    }
    document.querySelector('.js-todo-list').innerHTML = todoListHtml;
    localStorage.setItem('list', todoList);
}

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-duedate-input');
    const dueDate = dateInputElement.value;

    todoList.push({
        //name: name,
        //dueDate: dueDate
        name,
        dueDate
    });
    inputElement.value = '';
    renderTodoList();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function handleCostKeydown(event) {
    console.log(event.key);
    if (event.key === 'Enter') {
        addTodo();
    }
}