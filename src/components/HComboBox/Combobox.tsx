import { useEffect, useMemo, useState, useRef } from "react";
import { fetchChildren, searchNodes } from "../../api/faketree";
import { flatten } from "../../utils/tree";

const ROW_HEIGHT = 32;


function collectIds(node: any): string[] {
  let ids = [node.id];

  if (node.children) {
    node.children.forEach((c: any) => {
      ids = ids.concat(collectIds(c));
    });
  }

  return ids;
}
export default function Combobox() {
  const [tree, setTree] = useState<any[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [focused, setFocused] = useState(0);

  /* ---------- ROOT LOAD ---------- */

  useEffect(() => {
    loadRoot();
  }, []);

  async function loadRoot() {
    try {
      setLoadingId("root");
      const root = await fetchChildren();
      setTree(root.map(n => ({ ...n, level: 0 })));
    } catch {
      setError("Failed loading root");
    } finally {
      setLoadingId(null);
    }
  }

  /* ---------- EXPAND ---------- */

  async function expandNode(node: any) {
    if (node.children) {
      node.expanded = !node.expanded;
      setTree([...tree]);
      return;
    }

    try {
      setLoadingId(node.id);
      const kids = await fetchChildren(node.id);
      node.children = kids.map((k: any) => ({ ...k, level: node.level + 1 }));
      node.expanded = true;
      setTree([...tree]);
    } catch {
      setError("Failed loading children");
    } finally {
      setLoadingId(null);
    }
  }

  /* ---------- SEARCH ---------- */

  async function onSearch(q: string) {
    setQuery(q);

    if (!q) {
      setSearchResults([]);
      return;
    }

    const res = await searchNodes(q);
    setSearchResults(res);
  }

  /* ---------- SELECTION ---------- */

  function toggleSelect(node: any) {
    const ids = collectIds(node);

    setSelected(prev => {
      const next = new Set(prev);
      const checked = next.has(node.id);

      ids.forEach(id => (checked ? next.delete(id) : next.add(id)));

      return next;
    });
  }

  /* ---------- FLATTEN ---------- */

  const flat = useMemo(() => {
    if (searchResults.length) return searchResults;
    return flatten(tree);
  }, [tree, searchResults]);

  /* ---------- VIRTUALIZATION ---------- */

  const start = Math.floor(scrollTop / ROW_HEIGHT);
  const visible = flat.slice(start, start + 20);
  const totalHeight = flat.length * ROW_HEIGHT;

  /* ---------- KEYBOARD ---------- */

  function onKeyDown(e: any) {
    if (e.key === "ArrowDown") setFocused(f => Math.min(f + 1, flat.length - 1));
    if (e.key === "ArrowUp") setFocused(f => Math.max(f - 1, 0));
  }

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={e => onSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      {error && <div aria-live="assertive">{error}</div>}

      <div
        style={{ height: 300, overflow: "auto", border: "1px solid #ccc" }}
        onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="tree"
      >
        <div style={{ height: totalHeight }}>
          <div style={{ transform: `translateY(${start * ROW_HEIGHT}px)` }}>
            {visible.map((node, i) => {
              const index = flat.indexOf(node);

              return (
                <div
                  key={node.id}
                  role="treeitem"
                  aria-level={node.level + 1}
                  tabIndex={focused === index ? 0 : -1}
                  style={{
                    height: ROW_HEIGHT,
                    paddingLeft: node.level * 20,
                    background: focused === index ? "#eef" : ""
                  }}
                >
                  {node.hasChildren && (
                    loadingId === node.id ? (
                      "⏳"
                    ) : (
                      <button onClick={() => expandNode(node)}>
                        {node.expanded ? "▼" : "▶"}
                      </button>
                    )
                  )}

                  <input
                    type="checkbox"
                    checked={selected.has(node.id)}
                    onChange={() => toggleSelect(node)}
                  />

                  {node.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
