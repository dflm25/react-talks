import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Fetch con estado de carga y resultado (datos o error).
 *
 * @param {string | null | undefined} url
 * @param {{ enabled?: boolean } & Omit<RequestInit, 'signal'>} [options]
 *   `enabled: false` no lanza la petición (loading queda en false tras el primer efecto).
 */
export function useFetch(url, options = {}) {
  const { enabled = true, ...init } = options;

  const initRef = useRef(init);
  initRef.current = init;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled && url));
  const [reloadToken, setReloadToken] = useState(0);

  const refetch = useCallback(() => {
    setReloadToken((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!enabled || !url) {
      setLoading(false);
      setData(null);
      setError(null);
      return undefined;
    }

    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...initRef.current,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Respuesta no OK: ${response.status} ${response.statusText}`
          );
        }

        const contentType = response.headers.get('content-type') ?? '';
        const payload = contentType.includes('application/json')
          ? await response.json()
          : await response.text();

        setData(payload);
      } catch (e) {
        if (e.name === 'AbortError') {
          return;
        }
        setError(e);
        setData(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    run();

    return () => controller.abort();
  }, [url, enabled, reloadToken]);

  return {
    data,
    error,
    loading,
    refetch,
  };
}
