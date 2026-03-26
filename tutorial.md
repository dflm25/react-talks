# Tutorial: conceptos y archivos del proyecto

Este documento relaciona cada tema de la charla con los **archivos del código** donde verlo o reutilizarlo. El punto de entrada de la demo es el menú lateral de la app.

## Cómo se organiza la navegación

| Concepto | Archivo(s) |
|----------|------------|
| **Shell de la app** (layout, menú de ejemplos, estado de la pestaña activa) | [`src/App.js`](src/App.js) |
| **Estilos compartidos** de layout y ejemplos | [`src/App.css`](src/App.css) |
| **Bootstrap de React** (montar `App`, imports globales si aplican) | [`src/index.js`](src/index.js) |

El array `SECTIONS` en `App.js` define el orden y la etiqueta de cada ejemplo en el menú.

---

## Ejemplos en el menú (uno a uno)

### 1. Uso de JSX

**Qué es:** Sintaxis que mezcla JavaScript con marcado: expresiones entre `{ }`, `className`, listas, condicionales en el render.

| Archivo | Rol |
|---------|-----|
| [`src/examples/JsxBasics.js`](src/examples/JsxBasics.js) | Demo con interpolación, objeto, ternario y nota sobre `className`. |

---

### 2. Todo List con `useState`

**Qué es:** Estado local con `useState`: lista de tareas, input controlado, derivar la siguiente versión del array con el patrón funcional `setTodos((current) => ...)`.

| Archivo | Rol |
|---------|-----|
| [`src/examples/TodoListUseState.js`](src/examples/TodoListUseState.js) | Todo list completo (agregar, marcar hecho, eliminar). |

---

### 3. `useMemo` (comparación)

**Qué es:** Memorizar el **resultado** de un cálculo para no repetirlo en cada render si las dependencias no cambian. El demo contrasta un componente que recalcula en cada render con otro que usa `useMemo`.

| Archivo | Rol |
|---------|-----|
| [`src/examples/UseMemoComparison.js`](src/examples/UseMemoComparison.js) | Dos paneles + botón de “estado irrelevante” y otro que cambia el array `numbers`. |

---

### 4. `useMemo` para ordenar

**Qué es:** Mismo hook aplicado a un caso concreto (p. ej. ordenar sin reordenar en cada tecla) para que el coste del sort no se pague en renders innecesarios.

| Archivo | Rol |
|---------|-----|
| [`src/examples/UseMemoSort.js`](src/examples/UseMemoSort.js) | Ejemplo centrado en ordenar datos derivados. |

---

### 5. `useCallback`

**Qué es:** Memorizar la **referencia** de una función. Suele combinarse con `React.memo` en hijos para evitar re-renders cuando el padre se actualiza pero la función “es la misma”.

| Archivo | Rol |
|---------|-----|
| [`src/examples/UseCallbackExample.js`](src/examples/UseCallbackExample.js) | Dos padres (con y sin `useCallback`) y un hijo memorizado con contador de renders. |

---

### 6. Context API

**Qué es:** `createContext` + `Provider` para pasar datos a profundidad sin props en cada nivel. Los consumidores usan `useContext` (o un hook wrapper como `useTheme`).

| Archivo | Rol |
|---------|-----|
| [`src/examples/ContextApiExample.js`](src/examples/ContextApiExample.js) | Tema claro/oscuro, árbol anidado y validación de uso fuera del provider. |

---

### 7. Compound components (Tabs)

**Qué es:** Una API declarativa (`Tabs.List`, `Tabs.Tab`, …) donde subcomponentes coordinados comparten estado vía Context interno. Los índices se inyectan con `Children.map` + `cloneElement`.

| Archivo | Rol |
|---------|-----|
| [`src/examples/CompoundTabsExample.js`](src/examples/CompoundTabsExample.js) | Texto introductorio + demo con la API pública. |
| [`src/examples/compoundTabs/Tabs.js`](src/examples/compoundTabs/Tabs.js) | Implementación: `Tabs`, `List`, `Tab`, `Panels`, `Panel`. |

---

### 8. `useFetch` (custom hook)

**Qué es:** Encapsular `fetch`, `loading`, datos parseados, error, cancelación con `AbortController` y `refetch`.

| Archivo | Rol |
|---------|-----|
| [`src/hooks/useFetch.js`](src/hooks/useFetch.js) | Definición del hook (`data`, `error`, `loading`, `refetch`, opción `enabled`). |
| [`src/examples/UseFetchExample.js`](src/examples/UseFetchExample.js) | Pantalla que usa el hook contra JSONPlaceholder y fuerza error con URL incorrecta. |

---

### 9. Controlado vs no controlado

**Qué es:** Input **controlado** (`value` + `onChange` ligados a `useState`) frente a **no controlado** (`defaultValue` + `ref` para leer o mutar el DOM).

| Archivo | Rol |
|---------|-----|
| [`src/examples/ControlledUncontrolledExample.js`](src/examples/ControlledUncontrolledExample.js) | Dos columnas: espejo en estado vs lectura con botón. |

---

### 10. HOC (Higher-Order Component)

**Qué es:** Función que recibe un componente y devuelve otro componente “envuelto” con lógica o presentación extra (en este repo: estilos reutilizables en un botón).

| Archivo | Rol |
|---------|-----|
| [`src/examples/HocExample.js`](src/examples/HocExample.js) | `withStyledButton(PlainButton)` y comparación con el botón base. |

---

## Otros archivos útiles

| Archivo | Rol |
|---------|-----|
| [`README.md`](README.md) | Cómo instalar, arrancar la app, builds y notas del registro npm. |
| [`package.json`](package.json) | Scripts (`start`, `storybook`, etc.) y dependencias. |
| [`src/examples/constants.js`](src/examples/constants.js) | Constantes compartidas si algún ejemplo las importa (revisar imports en cada ejemplo). |

---

## Storybook

En `package.json` existen los scripts `storybook` y `build-storybook`. La configuración habitual vive en la carpeta **`.storybook/`** en la raíz del proyecto. Si en tu clon no aparece esa carpeta pero quieres Storybook, puedes inicializarlo con la CLI oficial de Storybook en este mismo proyecto (por ejemplo `npx storybook@latest init`) y volver a enlazar historias bajo `src/`.

---

## Resumen rápido por archivo (orden alfabético)

| Archivo | Tema |
|---------|------|
| `src/App.js` | Menú y enrutado entre ejemplos |
| `src/App.css` | Estilos de la shell y de las demos |
| `src/examples/compoundTabs/Tabs.js` | Compound components: Tabs |
| `src/examples/CompoundTabsExample.js` | Entry de la demo Tabs |
| `src/examples/ContextApiExample.js` | Context API |
| `src/examples/ControlledUncontrolledExample.js` | Inputs controlados / no controlados |
| `src/examples/HocExample.js` | HOC de estilo en botón |
| `src/examples/JsxBasics.js` | JSX |
| `src/examples/TodoListUseState.js` | `useState` con lista |
| `src/examples/UseCallbackExample.js` | `useCallback` + `memo` |
| `src/examples/UseFetchExample.js` | Demo del hook `useFetch` |
| `src/examples/UseMemoComparison.js` | `useMemo` vs sin memo |
| `src/examples/UseMemoSort.js` | `useMemo` + ordenación |
| `src/hooks/useFetch.js` | Custom hook de red |

Si añades un ejemplo nuevo: crea el componente bajo `src/examples/`, regístralo en `SECTIONS` dentro de `src/App.js` y opcionalmente actualiza este `tutorial.md`.
