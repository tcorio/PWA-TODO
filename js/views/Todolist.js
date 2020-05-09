import TodoElement from '../components/todoElement';
import TodoListService from '../services/TodoListService';

export default function Todolist(outlet, data) {
  outlet.innerHTML = '';
  const constructor = document.createElement('div');
  constructor.innerHTML = `
    <section class="h-full">
      <h1 class="text-2xl font-semibold m-4 text-center">${data.todolist.name}</h1>
      <ul name="todolistElements"></ul>
      <form name="addTodo" class="w-full flex flex-col items-center mt-4">
        <label for="todoContent">New Todo</label>
        <div class="w-full flex hover:shadow transition-all duration-200 ease-out m-2">
          <input type="text" id="todoContent" name="todoContent" class="w-full rounded outline-none p-2 rounded-br-none rounded-tr-none">
          <button class="bg-blue-300 outline-none rounded px-3 text-xl text-white rounded-tl-none rounded-bl-none hover:shadow hover:bg-blue-400 transition-all duration-200 ease-out">+</button>
        </div>
      </form>
    </section>
  `;
  const form = constructor.querySelector('[name=addTodo]');
  const input = form.querySelector('input[name=todoContent]');
  const elementOutlet = constructor.querySelector('[name=todolistElements]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const todoContent = input.value;
    if(todoContent === '') { return false; }
    TodoListService.addTodo(todoContent).then(
      async (newTodo) => {
        if(newTodo) {
          input.value = '';
          await refreshTodos(elementOutlet);
        }
    });
  })

  displayTodos(elementOutlet, data.todolist.elements);
  outlet.appendChild(constructor);
  return constructor;
}

async function refreshTodos(outlet) {
  const todos = await TodoListService.getTodos();
  displayTodos(outlet, todos, true);
}

function displayTodos(outlet, todos, cleanOutlet = false) {
  if(cleanOutlet) { outlet.innerHTML = ''}
  for(const element of todos) {
    const todoElement = TodoElement(outlet, element);
    todoElement.addEventListener('remove', async (e) => await refreshTodos(outlet))

  }
}
