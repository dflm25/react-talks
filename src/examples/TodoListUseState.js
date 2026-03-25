import { useState } from 'react';

function TodoListUseState() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Preparar intro de JSX', done: true },
    { id: 2, text: 'Explicar diferencias useState vs useReducer', done: false },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanText = text.trim();

    if (!cleanText) {
      return;
    }

    setTodos((current) => [
      ...current,
      { id: Date.now(), text: cleanText, done: false },
    ]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <section className="example-panel">
      <h1>Todo List con useState</h1>
      <p>
        Maneja dos estados: el texto del input y el arreglo de tareas. Cada
        accion actualiza el estado con <code>setState</code>.
      </p>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          className="todo-input"
          type="text"
          placeholder="Nueva tarea..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <button
              type="button"
              className={todo.done ? 'todo-text is-done' : 'todo-text'}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </button>
            <button type="button" onClick={() => removeTodo(todo.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoListUseState;
