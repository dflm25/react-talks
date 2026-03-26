import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

const OK_URL = 'https://jsonplaceholder.typicode.com/users/1';
const FAIL_URL = 'https://jsonplaceholder.typicode.com/users/999999';

function UseFetchExample() {
  const [useBadUrl, setUseBadUrl] = useState(false);
  const url = useBadUrl ? FAIL_URL : OK_URL;

  const { data, error, loading, refetch } = useFetch(url);

  return (
    <div className="memo-demo fetch-demo">
      <section className="example-panel">
        <h1>Custom hook: useFetch</h1>
        <p>
          El hook expone <code>loading</code>, <code>data</code>, <code>error</code>{' '}
          y <code>refetch</code>. La petición se cancela al desmontar o al cambiar{' '}
          <code>url</code> (AbortController).
        </p>
        <div className="memo-controls fetch-demo-controls">
          <label className="fetch-toggle">
            <input
              type="checkbox"
              checked={useBadUrl}
              onChange={(e) => setUseBadUrl(e.target.checked)}
            />
            Usar URL que devuelve 404 (forzar error)
          </label>
          <button type="button" onClick={refetch}>
            Volver a pedir (refetch)
          </button>
        </div>
        <p className="example-note fetch-demo-url">
          <code>{url}</code>
        </p>
      </section>

      <section className="example-panel fetch-demo-result">
        <h2>Estado de la petición</h2>

        {loading && (
          <p className="fetch-loading" role="status" aria-live="polite">
            Cargando…
          </p>
        )}

        {!loading && error && (
          <div className="fetch-error">
            <strong>Error</strong>
            <pre>{error.message}</pre>
          </div>
        )}

        {!loading && !error && data != null && (
          <div className="fetch-success">
            <strong>Datos (response parseado)</strong>
            <pre className="fetch-json">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}

export default UseFetchExample;
