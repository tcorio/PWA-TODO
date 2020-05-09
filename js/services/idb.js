import { openDB } from 'idb';

export default class idbService {
  db = null;

  async initDb() {
    this.db = await openDB('todolist', 1, {
      upgrade(db) {
        // Create a store of objects
        db.createObjectStore('todos', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        });
      }
    });
  }

  async setTodos(todos) {
    if(!this.db) { await this.initDb() }
    const tx = this.db.transaction('todos', 'readwrite');
    tx.store.clear();
    for (const todo of todos) {
      tx.store.put(todo)
    }
    await tx.done;
  }

  async getTodos() {
    if(!this.db) { await this.initDb() }
    return await this.db.getAll('todos')
  }

  async addOrUpdateTodo(todo) {
    if(!this.db) { await this.initDb() }
    const tx = this.db.transaction('todos', 'readwrite');
    tx.store.put(todo)
    await tx.done;
  }

  async deleteTodo(id) {
    if(!this.db) { await this.initDb() }
    console.log(await this.db.get('todos', id))
    await this.db.delete('todos', id)
  }
}
