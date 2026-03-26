import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const ThemeContext = createContext(null);

function useTheme() {
  const value = useContext(ThemeContext);
  if (value == null) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return value;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Componente profundo: no recibe theme por props; lee el contexto. */
function IndicadorTemaProfundo() {
  const { theme } = useTheme();

  return (
    <div className="context-nested-deep">
      <p className="context-nested-label">
        Hijo anidado — lee el tema sin recibir props:
      </p>
      <p className="context-theme-label">
        Tema actual: <strong>{theme}</strong>
      </p>
    </div>
  );
}

function Nivel2() {
  const { theme } = useTheme();
  console.log("Nivel 2", theme);
  return (
    <div className="context-nested context-nested-2">
      <span className="context-nested-label">Nivel 2</span>
      <Nivel3 />
    </div>
  );
}

function Nivel3() {
  const { theme } = useTheme();
  console.log("Nivel 3", theme);
  return (
    <div className="context-nested context-nested-3">
      <span className="context-nested-label">Nivel 3</span>
      <IndicadorTemaProfundo />
    </div>
  );
}

function PanelTema() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section
      className={`example-panel context-theme-surface ${
        theme === 'dark' ? 'is-dark' : 'is-light'
      }`}
    >
      <h2>Panel que consume el contexto</h2>
      <p>
        El botón actualiza el estado en el <code>Provider</code>. Cualquier
        hijo (a cualquier profundidad) puede leerlo con{' '}
        <code>useContext</code> / un hook personalizado.
      </p>
      <div className="memo-controls context-theme-actions">
        <button type="button" onClick={toggleTheme}>
          Alternar tema (light / dark)
        </button>
      </div>
      <Nivel2 />
    </section>
  );
}

function ContextApiExample() {
  return (
    <ThemeProvider>
      <div className="memo-demo context-api-demo">
        <section className="example-panel">
          <h1>Context API</h1>
          <p>
            <code>createContext</code> + <code>Provider</code> exponen un valor
            a todo el árbol por debajo, sin pasar props en cada nivel (evitas el
            &quot;prop drilling&quot;).
          </p>
          <p className="example-note">
            Este ejemplo está envuelto en <code>ThemeProvider</code> solo en
            esta vista. El estado del tema no vive en <code>App.js</code>.
          </p>
        </section>

        <PanelTema />
      </div>
    </ThemeProvider>
  );
}

export default ContextApiExample;
