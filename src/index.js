import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
Funciones Clave de StrictMode:
Doble renderizado: Ejecuta componentes y useEffect dos veces para detectar errores de lógica y efectos secundarios.
Advertencias de API obsoletas: Identifica el uso de métodos heredados, como componentWillMount o APIs de contexto antiguas.
Búsqueda de efectos secundarios: Ayuda a asegurar que la renderización sea pura y los efectos tengan limpieza (cleanup) adecuada.
*/