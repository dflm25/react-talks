import { useMemo, useState } from 'react';

const INITIAL_WORDS = ["Carlos", "Ana", "Juan", "Maria", "Pedro", "Alberto", "Fernando"];

function UseMemoSort() {
    const [update, setUpdate] = useState(0);

    const sortedWords = useMemo(() => {
        console.log("Calculando sortedWords");
        return [...INITIAL_WORDS].sort();
    }, []);

    return (
        <section className="example-panel">
        <h1>useMemo para ordenar</h1>
        <p>
            useMemo es una función que memoriza el resultado de una función.
        </p>
        <ul className="example-list">
            {sortedWords.map((word) => (
            <li key={word}>{word}</li>
            ))}
        </ul>
        <button type="button" onClick={() => setUpdate((u) => u + 1)}>
            Cambiar estado irrelevante (fuerza re-render del padre) {update}
        </button>
        </section>
    );
}

export default UseMemoSort;