const STORAGE_KEYS = {
  todos: "readygo.todos",
  busStop: "readygo.busStop",
  departure: "readygo.departure",
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

export function loadDeparture(defaultDeparture) {
  try {
    const savedDeparture = window.localStorage.getItem(STORAGE_KEYS.departure);
    return savedDeparture ? JSON.parse(savedDeparture) : defaultDeparture;
  } catch {
    return defaultDeparture;
  }
}

export function saveDeparture(departure) {
  window.localStorage.setItem(STORAGE_KEYS.departure, JSON.stringify(departure));
}
