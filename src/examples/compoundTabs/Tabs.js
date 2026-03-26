import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';

const TabsContext = createContext(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (ctx == null) {
    throw new Error('Los subcomponentes de Tabs deben usarse dentro de <Tabs>.');
  }
  return ctx;
}

function TabsRoot({ children, defaultIndex = 0 }) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const baseId = useId();

  const value = useMemo(
    () => ({
      selectedIndex,
      setSelectedIndex,
      baseId,
    }),
    [selectedIndex, baseId]
  );

  return (
    <TabsContext.Provider value={value}>
      <div className="compound-tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className = '' }) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <div
      role="tablist"
      className={['compound-tabs-list', className].filter(Boolean).join(' ')}
    >
      {items.map((child, index) =>
        cloneElement(child, {
          index,
          key: child.key ?? `tab-${index}`,
        })
      )}
    </div>
  );
}

function TabsTab({ children, index }) {
  const { selectedIndex, setSelectedIndex, baseId } = useTabsContext();
  const selected = selectedIndex === index;
  const tabId = `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel-${index}`;

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      className={selected ? 'compound-tab is-active' : 'compound-tab'}
      onClick={() => setSelectedIndex(index)}
    >
      {children}
    </button>
  );
}

function TabsPanels({ children }) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <div className="compound-tabs-panels">
      {items.map((child, index) =>
        cloneElement(child, {
          index,
          key: child.key ?? `panel-${index}`,
        })
      )}
    </div>
  );
}

function TabsPanel({ children, index }) {
  const { selectedIndex, baseId } = useTabsContext();
  const selected = selectedIndex === index;
  const tabId = `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel-${index}`;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!selected}
      className="compound-tab-panel"
    >
      {children}
    </div>
  );
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panels: TabsPanels,
  Panel: TabsPanel,
});
