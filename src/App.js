import { useState } from 'react';
import './App.css';
import JsxBasics from './examples/JsxBasics';
import TodoListUseState from './examples/TodoListUseState';
import UseMemoComparison from './examples/UseMemoComparison';
import UseMemoSort from './examples/UseMemoSort';
import UseCallbackExample from './examples/UseCallbackExample';
import ContextApiExample from './examples/ContextApiExample';
import CompoundTabsExample from './examples/CompoundTabsExample';
import UseFetchExample from './examples/UseFetchExample';
import ControlledUncontrolledExample from './examples/ControlledUncontrolledExample';
import HocExample from './examples/HocExample';

const SECTIONS = [
  { id: 'jsx', label: 'Uso de JSX', Component: JsxBasics },
  { id: 'todo-use-state', label: 'Todo List con useState', Component: TodoListUseState },
  { id: 'use-memo', label: 'useMemo (comparación)', Component: UseMemoComparison },
  { id: 'use-memo-sort', label: 'useMemo para ordenar', Component: UseMemoSort },
  { id: 'use-callback', label: 'useCallback', Component: UseCallbackExample },
  { id: 'context-api', label: 'Context API', Component: ContextApiExample },
  { id: 'compound-tabs', label: 'Compound: Tabs', Component: CompoundTabsExample },
  { id: 'use-fetch', label: 'useFetch (custom hook)', Component: UseFetchExample },
  {
    id: 'controlled-uncontrolled',
    label: 'Controlado / no controlado',
    Component: ControlledUncontrolledExample,
  },
  { id: 'hoc', label: 'HOC (estilo en botón)', Component: HocExample },
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
