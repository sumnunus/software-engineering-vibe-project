const STORAGE_KEYS = {
  todos: "readygo.todos",
  busStop: "readygo.busStop",
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

export function loadBusStop(defaultBusStop) {
  try {
    const savedBusStop = window.localStorage.getItem(STORAGE_KEYS.busStop);
    return savedBusStop ? JSON.parse(savedBusStop) : defaultBusStop;
  } catch {
    return defaultBusStop;
  }
}

export function saveBusStop(busStop) {
  window.localStorage.setItem(STORAGE_KEYS.busStop, JSON.stringify(busStop));
}
