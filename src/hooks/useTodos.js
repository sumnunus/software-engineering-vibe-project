import { useEffect, useMemo, useState } from "react";
import { todos as defaultTodos } from "../data/mockData.js";
import { loadTodos, saveTodos } from "../services/storageService.js";

function createTodo(title) {
  const now = new Date().toISOString();

  return {
    id: `todo-${crypto.randomUUID()}`,
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

function sanitizeTitle(title) {
  return title.trim();
}

export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos(defaultTodos));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );

  const isAllCompleted = todos.length > 0 && completedCount === todos.length;

  function clearError() {
    setErrorMessage("");
  }

  function addTodo(title) {
    const cleanTitle = sanitizeTitle(title);

    if (!cleanTitle) {
      setErrorMessage("내용을 입력해 주세요.");
      return false;
    }

    setTodos((currentTodos) => [...currentTodos, createTodo(cleanTitle)]);
    clearError();
    return true;
  }

  function updateTodo(id, title) {
    const cleanTitle = sanitizeTitle(title);

    if (!cleanTitle) {
      setErrorMessage("내용을 입력해 주세요.");
      return false;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: cleanTitle, updatedAt: new Date().toISOString() } : todo
      )
    );
    clearError();
    return true;
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    clearError();
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
    clearError();
  }

  return {
    todos,
    completedCount,
    errorMessage,
    isAllCompleted,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,
  };
}
