import page from 'page';
import TodoListService from './services/TodoListService';

const outlet = document.querySelector('#app .outlet');
page('/', async () => {
  const module = await import('./views/Todolist.js');
  const Todolist = module.default;

  const todoElements = await TodoListService.getTodos();
  Todolist(outlet, {
    todolist: {
      name: 'Shopping list',
      elements: todoElements
    }
  })
})

page();
