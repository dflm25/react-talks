/**
 * @param {React.ComponentType} WrappedComponent
 */
function withStyledButton(WrappedComponent) {
  function StyledButton({ className = '', ...rest }) {
    return (
      <WrappedComponent
        {...rest}
        className={['hoc-fancy-btn', className].filter(Boolean).join(' ')}
      />
    );
  }

  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  StyledButton.displayName = `withStyledButton(${name})`;

  return StyledButton;
}

function PlainButton({ children, className = '', ...rest }) {
  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
}

const BotonConEstiloHoc = withStyledButton(PlainButton);

function HocExample() {
  return (
    <div className="memo-demo hoc-demo">
      <section className="example-panel">
        <h1>Higher-Order Components (HOC)</h1>
        <p>
          Un HOC es una <strong>función</strong> que recibe un componente y
          devuelve <strong>otro componente nuevo</strong> con comportamiento o
          presentación extra (composición por envoltura).
        </p>
        <p>
          Aquí <code>withStyledButton(PlainButton)</code> reutiliza la misma
          marca de botón sin duplicar el JSX del <code>&lt;button&gt;</code>.
        </p>
      </section>

      <section className="example-panel memo-panel">
        <h2>HOC de estilo en botón</h2>
        <p className="hoc-lead">
          El HOC concatena la clase <code>hoc-fancy-btn</code> al componente
          envuelto. Comparación lado a lado con el botón base sin envolver.
        </p>
        <div className="hoc-row">
          <PlainButton className="hoc-plain-btn">Sin HOC</PlainButton>
          <BotonConEstiloHoc>Con withStyledButton</BotonConEstiloHoc>
        </div>
      </section>
    </div>
  );
}

export default HocExample;
