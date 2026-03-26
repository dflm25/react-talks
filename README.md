# React Talks

Repositorio de ejemplos para una charla de React.

Este proyecto esta creado con **Create React App** e incluye varios ejemplos practicos para explicar conceptos de React de forma incremental:

- JSX
- `useState` (contador y todo list)
- `useReducer`
- `useMemo`
- `useCallback`
- Context API
- Compound Components (Tabs)
- Custom hook `useFetch`
- Storybook para mostrar componentes y ejemplos

## Requisitos

- Node.js 18+ recomendado
- npm (incluido con Node.js)

## Como correr el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Levantar la app en desarrollo:

```bash
npm start
```

3. Abrir en el navegador:

- [http://localhost:3000](http://localhost:3000)

## Como correr Storybook

```bash
npm run storybook
```

Storybook abre en:

- [http://localhost:6006](http://localhost:6006)

## Build de produccion

```bash
npm run build
```

Genera la carpeta `build/`.

## Build estatico de Storybook

```bash
npm run build-storybook
```

Genera la carpeta `storybook-static/`.

## Estructura principal

- `src/App.js`: menu para navegar entre ejemplos.
- `src/examples/`: ejemplos de hooks, context y patrones.
- `src/hooks/useFetch.js`: custom hook para fetch con `loading`, `data` y `error`.
- `.storybook/`: configuracion de Storybook.

## Notas

- Si `npm` usa un registro privado y falla la instalacion, puedes forzar el publico:

```bash
npm_config_registry=https://registry.npmjs.org/ npm install
```
