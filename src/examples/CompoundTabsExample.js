import { Tabs } from './compoundTabs/Tabs';

function CompoundTabsExample() {
  return (
    <div className="memo-demo compound-tabs-demo">
      <section className="example-panel">
        <h1>Compound components: Tabs</h1>
        <p>
          Varios subcomponentes comparten estado mediante Context (dentro de{' '}
          <code>Tabs</code>). La API flexible agrupa responsabilidades: lista,
          pestañas, paneles — sin props intermedias entre padre y nietos.
        </p>
        <pre className="compound-tabs-snippet">
{`<Tabs>
  <Tabs.List>
    <Tabs.Tab>Home</Tabs.Tab>
    <Tabs.Tab>Profile</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panels>
    <Tabs.Panel>Home content</Tabs.Panel>
    <Tabs.Panel>Profile content</Tabs.Panel>
  </Tabs.Panels>
</Tabs>`}
        </pre>
      </section>

      <section className="example-panel compound-tabs-live">
        <h2 className="compound-tabs-live-title">Demo</h2>
        <Tabs defaultIndex={0}>
          <Tabs.List>
            <Tabs.Tab>Home</Tabs.Tab>
            <Tabs.Tab>Profile</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels>
            <Tabs.Panel>
              <p className="compound-tab-panel-lead">
                Contenido de <strong>Home</strong>. El índice activo lo guarda{' '}
                <code>Tabs</code>; cada <code>Tab</code> y <code>Panel</code>{' '}
                recibe su posición al componer la lista (clonando hijos con{' '}
                <code>index</code>).
              </p>
            </Tabs.Panel>
            <Tabs.Panel>
              <p className="compound-tab-panel-lead">
                Contenido de <strong>Profile</strong>. Mismo orden de hijos en{' '}
                <code>List</code> y <code>Panels</code> para alinear pestaña ↔
                panel.
              </p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </section>
    </div>
  );
}

export default CompoundTabsExample;
