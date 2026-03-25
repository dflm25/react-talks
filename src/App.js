import { useState } from 'react';
import './App.css';
import JsxBasics from './examples/JsxBasics';
import TodoListUseState from './examples/TodoListUseState';

const SECTIONS = [
  { id: 'jsx', label: 'Uso de JSX', Component: JsxBasics },
  { id: 'todo-use-state', label: 'Todo List con useState', Component: TodoListUseState },
];

function App() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];
  const { Component: ActiveExample } = active;

  return (
    <div className="app-shell">
      <aside className="app-nav" aria-label="Ejemplos de la charla">
        <h2 className="app-nav-title">Ejemplos</h2>
        <nav>
          <ul className="app-nav-list">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  className={id === activeId ? 'app-nav-link is-active' : 'app-nav-link'}
                  onClick={() => setActiveId(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="app-main">
        <ActiveExample />
      </main>
    </div>
  );
}

export default App;
