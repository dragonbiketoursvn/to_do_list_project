// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    }
    this.todos.push(todo);
  }
  size() {
    return this.todos.length;
  }
  first() {
    return this.todos[0];
  }
  last() {
    if (this.todos.length === 0) {
      return undefined;
    }
    return this.todos.slice(-1);
  }
  _validateIndex(idx) {
    if (this.todos[idx] === undefined) {
      throw new ReferenceError(`Invalid index: ${idx}`);
    } else {
      return true;
    }
  }
  itemAt(idx) {
    this._validateIndex(idx);
    return this.todos[idx];
  }
  markDoneAt(idx) {
    this.itemAt(idx).markDone();
  }
  markUndoneAt(idx) {
    this.itemAt(idx).markUndone();
  }
  isDone() {
    return this.todos.every(todo => todo.isDone());
  }
  shift() {
    return this.todos.pop();
  }
  pop() {
    return this.todos.pop();
  }
  removeAt(idx) {
    this._validateIndex(idx);
    return this.todos.splice(idx, 1)[0];
  }
  toString() {
    let result = '---- Today\'s Todos ----\n';
    this.todos.forEach(todo => {
      result += `${todo.toString()}\n`;
    });
    return result;
  }
  forEach(callback) {
    this.todos.forEach(callback);
  }
  filter(callback) {
    let returnList = new TodoList(this.title);
    this.forEach(todo => {
      if (callback(todo)) {
        returnList.add(todo);
      }
    });
    return returnList;
  }
}
