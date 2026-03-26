import { useMemo, useRef, useState } from 'react';

const INITIAL_NUMBERS = [1, 2, 3, 4, 5];

function sumNumbers(numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

/** Recalcula el total en cada render: el reduce corre siempre. */
function TotalSinMemo({ numbers }) {
  const rendersRef = useRef(0);
  const reduceRunsRef = useRef(0);

  rendersRef.current += 1;

  const total = (() => {
    console.log("Calculando total sin useMemo");
    reduceRunsRef.current += 1;
    return sumNumbers(numbers);
  })();

  return (
    <section className="example-panel memo-panel">
      <h2>Sin useMemo</h2>
      <p>
        Cada vez que el padre re-renderiza (por ejemplo al pulsar &quot;Cambiar
        estado irrelevante&quot;), este componente vuelve a ejecutar el{' '}
        <code>reduce</code>.
      </p>
      <ul className="example-list memo-metrics">
        <li>
          Renders de este bloque: <strong>{rendersRef.current}</strong>
        </li>
        <li>
          Veces que corrió <code>reduce</code>: <strong>{reduceRunsRef.current}</strong>
        </li>
      </ul>
      <p className="example-counter-value memo-total">Total: {total}</p>
    </section>
  );
}

/** Solo recalcula cuando cambia la referencia o contenido relevante de numbers. */
function TotalConMemo({ numbers }) {
  const rendersRef = useRef(0);
  const reduceRunsRef = useRef(0);

  rendersRef.current += 1;

  const total = useMemo(() => {
    console.log("Calculando total con useMemo");
    reduceRunsRef.current += 1;
    return sumNumbers(numbers);
  }, [numbers]);

  return (
    <section className="example-panel memo-panel">
      <h2>Con useMemo</h2>
      <p>
        El <code>reduce</code> solo se ejecuta de nuevo cuando cambia{' '}
        <code>numbers</code> (dependencia del hook). Un re-render del padre sin
        tocar <code>numbers</code> no vuelve a sumar.
      </p>
      <ul className="example-list memo-metrics">
        <li>
          Renders de este bloque: <strong>{rendersRef.current}</strong>
        </li>
        <li>
          Veces que corrió <code>reduce</code>: <strong>{reduceRunsRef.current}</strong>
        </li>
      </ul>
      <p className="example-counter-value memo-total">Total: {total}</p>
    </section>
  );
}

function UseMemoComparison() {
  const [tick, setTick] = useState(0);
  const [numbers, setNumbers] = useState(() => [...INITIAL_NUMBERS]);

  return (
    <div className="memo-demo">
      <section className="example-panel">
        <h1>useMemo: ¿cuándo se recalcula?</h1>
        <p>
          Misma idea que <code>const total = numbers.reduce(...)</code>, pero
          comparando dos componentes hijo: uno suma en cada render y otro memoriza
          el resultado.
        </p>

        <div className="memo-controls">
          <button type="button" onClick={() => setTick((t) => t + 1)}>
            Cambiar estado irrelevante (fuerza re-render del padre)
          </button>
          <span className="memo-tick">
            tick: <strong>{tick}</strong>
          </span>
        </div>

        <p className="example-note">
          <button
            type="button"
            className="memo-link-button"
            onClick={() => setNumbers((n) => [...n, 0])}
          >
            Cambiar <code>numbers</code> (añade un 0 al final)
          </button>{' '}
          — ambos bloques deben volver a sumar una vez.
        </p>

        <p className="memo-array">
          <code>numbers</code> = [{numbers.join(', ')}]
        </p>
      </section>

      <div className="memo-panels">
        <TotalSinMemo numbers={numbers} />
        <TotalConMemo numbers={numbers} />
      </div>
    </div>
  );
}

export default UseMemoComparison;
