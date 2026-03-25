import React from 'react';
import { productos } from './constants';

function JsxBasics() {
  return (
    <>
      <section className="example-panel">
        <h1>Uso de JSX</h1>
        <p>
          Las llaves <code>{'{ }'}</code> interpolan JavaScript en el marcado.
        </p>

        <ul className="example-list">
          <li>Expresión: {2 + 2}</li>
        </ul>
        <ul className="example-list">
          {productos.map((producto) => (
            <li key={producto.id}>{producto.nombre} — ${producto.precio}</li>
          ))}
        </ul>
        <p className="example-note">
          <code>className</code> es el equivalente a <code>class</code> en HTML.
        </p>
      </section>
      <section className="example-panel">
        <h1>Uso de React.createElement</h1>
        <p>
          React.createElement es una función que crea un elemento React.
        </p>
        {React.createElement('ul', null, [
          React.createElement('li', null, 'Hola'),
          React.createElement('li', null, 'Hola'),
        ])}
      </section>
    </>
  );
}

export default JsxBasics;