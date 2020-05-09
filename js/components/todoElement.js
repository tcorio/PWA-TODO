import TodolistService from '../services/TodoListService';

export default function TodoElement(outlet, data) {
  const constructor = document.createElement('li');
  constructor.classList = "max-w-lg w-full flex justify-between rounded bg-white mb-4 hover:shadow transition-all duration-200 ease-out"
  constructor.innerHTML = `
    <div class="p-4 border-r border-solid border-gray-300 flex items-center">
      <input type="checkbox" id="done-${data.id}" name="done" ${data.done ? 'checked' : ''}>
      <label for="done-${data.id}" class="ml-2">Done</label>
    </div>
    <div class="p-4 flex flex-grow">
      <span>${data.content}</span>
    </div>
    <button name="deleteElement" class="p-4 flex justify-center items-center text-red-600 hover:bg-red-600 hover:text-white transition-color duration-300 rounded-tr rounded-br outline-none">
      <span class="transition-none text-xl font-bold">x</span>
    </button>
  `
  const checkbox = constructor.querySelector('input[type=checkbox]');
  checkbox.addEventListener('change', async(e) => {
    const state = e.target.checked;
    await TodolistService.changeDoneState(data, state)
  })

  const deleteButton = constructor.querySelector('button[name=deleteElement]');
  deleteButton.addEventListener('click', async (e) => {
    await TodolistService.removeTodo(data.id)
    const removeEvent = new CustomEvent('remove');
    constructor.dispatchEvent(removeEvent);
  })
  outlet.appendChild(constructor);
  return constructor;
}
