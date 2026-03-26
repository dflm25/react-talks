import { memo, useCallback, useRef, useState } from 'react';

/**
 * Hijo memorizado: solo re-renderiza si sus props cambian (comparación superficial).
 * Si el padre pasa una función nueva en cada render, este componente se pinta otra vez.
 */
const HijoConMemo = memo(function HijoConMemo({ titulo, onAccion }) {
  const rendersRef = useRef(0);
  rendersRef.current += 1;

  return (
    <div className="callback-child">
      <p className="callback-child-title">{titulo}</p>
      <ul className="example-list memo-metrics">
        <li>
          Renders del hijo: <strong>{rendersRef.current}</strong>
        </li>
      </ul>
      <button type="button" className="callback-child-btn" onClick={onAccion}>
        Llamar callback del padre
      </button>
    </div>
  );
});

function PadreSinUseCallback() {
  const [tick, setTick] = useState(0);
  const [clicks, setClicks] = useState(0);

  return (
    <section className="example-panel memo-panel">
      <h2>Sin useCallback</h2>
      <p>
        El padre crea una función nueva en cada render:{' '}
        <code>onAccion=&#123;() =&gt; ...&#125;</code>. El hijo está envuelto en{' '}
        <code>memo</code>, pero la prop función siempre es distinta → el hijo{' '}
        <strong>sí</strong> re-renderiza cuando pulsas &quot;Re-render del
        padre&quot;.
      </p>
      <div className="memo-controls callback-padre-controls">
        <button type="button" onClick={() => setTick((t) => t + 1)}>
          Re-render del padre (tick)
        </button>
        <span className="memo-tick">
          tick: <strong>{tick}</strong>
        </span>
        <span className="memo-tick">
          clicks hijo: <strong>{clicks}</strong>
        </span>
      </div>
      <HijoConMemo
        titulo="Hijo (padre sin useCallback)"
        onAccion={() => setClicks((c) => c + 1)}
      />
    </section>
  );
}

function PadreConUseCallback() {
  const [tick, setTick] = useState(0);
  const [clicks, setClicks] = useState(0);

  const onAccion = useCallback(() => {
    setClicks((c) => c + 1);
  }, []);

  return (
    <section className="example-panel memo-panel">
      <h2>Con useCallback</h2>
      <p>
        La misma referencia de función entre renders gracias a{' '}
        <code>useCallback(..., [])</code>. El hijo <code>memo</code> no se
        vuelve a pintar solo porque el padre actualizó <code>tick</code>.
      </p>
      <div className="memo-controls callback-padre-controls">
        <button type="button" onClick={() => setTick((t) => t + 1)}>
          Re-render del padre (tick)
        </button>
        <span className="memo-tick">
          tick: <strong>{tick}</strong>
        </span>
        <span className="memo-tick">
          clicks hijo: <strong>{clicks}</strong>
        </span>
      </div>
      <HijoConMemo titulo="Hijo (padre con useCallback)" onAccion={onAccion} />
    </section>
  );
}

function UseCallbackExample() {
  return (
    <div className="memo-demo">
      <div className="memo-panels">
        <PadreSinUseCallback />
        <PadreConUseCallback />
      </div>
    </div>
  );
}

export default UseCallbackExample;
