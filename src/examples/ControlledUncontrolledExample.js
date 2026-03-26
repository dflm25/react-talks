import { useRef, useState } from 'react';

function ControlledUncontrolledExample() {
  return (
    <div className="memo-demo controlled-demo">
      <section className="example-panel">
        <h1>Inputs controlados vs no controlados</h1>
        <p>
          <strong>Controlado</strong>: el valor vive en el estado de React (
          <code>value</code> + <code>onChange</code>). Cada tecla actualiza el
          estado y React vuelve a pintar el input.
        </p>
        <p>
          <strong>No controlado</strong>: el valor vive en el DOM. Suele usarse{' '}
          <code>defaultValue</code> y/o <code>ref</code> para leer o escribir
          cuando haga falta.
        </p>
      </section>

      <div className="memo-panels controlled-panels">
        <ControlledField />
        <UncontrolledField />
      </div>
    </div>
  );
}

function ControlledField() {
  const [text, setText] = useState('');
  console.log("ControlledField", text);

  return (
    <section className="example-panel memo-panel">
      <h2>Controlado</h2>
      <p className="controlled-lead">
        <code>value=&#123;text&#125;</code> y{' '}
        <code>onChange</code> → el texto mostrado abajo se actualiza al instante.
      </p>
      <label className="controlled-label" htmlFor="controlled-input">
        Nombre
      </label>
      <input
        id="controlled-input"
        className="controlled-input"
        type="text"
        autoComplete="off"
        placeholder="Escribe aquí…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="controlled-mirror">
        Estado en React: <strong>{text === '' ? '∅ vacío' : text}</strong>
      </p>
      <div className="example-actions">
        <button type="button" onClick={() => setText('')}>
          Limpiar estado
        </button>
      </div>
    </section>
  );
}

function UncontrolledField() {
  const inputRef = useRef(null);
  const [lastRead, setLastRead] = useState('(pulsa “Leer valor”)');

  return (
    <section className="example-panel memo-panel">
      <h2>No controlado</h2>
      <p className="controlled-lead">
        <code>defaultValue</code> + <code>ref</code>. React no guarda el texto en{' '}
        <code>useState</code>; lo leemos del nodo cuando queremos.
      </p>
      <label className="controlled-label" htmlFor="uncontrolled-input">
        Comentario
      </label>
      <input
        id="uncontrolled-input"
        ref={inputRef}
        className="controlled-input"
        type="text"
        autoComplete="off"
        defaultValue="Hola DOM"
        placeholder="Escribe aquí…"
      />
      <p className="controlled-mirror">
        Último valor leído: <strong>{lastRead}</strong>
      </p>
      <div className="example-actions">
        <button
          type="button"
          onClick={() => {
            const el = inputRef.current;
            setLastRead(el ? el.value : '');
          }}
        >
          Leer valor
        </button>
        <button
          type="button"
          onClick={() => {
            const el = inputRef.current;
            if (el) {
              el.value = '';
              setLastRead('(vacío en DOM)');
            }
          }}
        >
          Vaciar vía ref
        </button>
      </div>
    </section>
  );
}

export default ControlledUncontrolledExample;
