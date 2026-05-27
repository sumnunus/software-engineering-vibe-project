const STORAGE_KEYS = {
  todos: "readygo.todos",
};

export function loadTodos(defaultTodos) {
  try {
    const savedTodos = window.localStorage.getItem(STORAGE_KEYS.todos);
    return savedTodos ? JSON.parse(savedTodos) : defaultTodos;
  } catch {
    return defaultTodos;
  }
}

export function saveTodos(todos) {
  window.localStorage.setItem(STORAGE_KEYS.todos, JSON.stringify(todos));
}
