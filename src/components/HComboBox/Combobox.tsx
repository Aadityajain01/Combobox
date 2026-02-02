import { useEffect, useMemo } from "react";
import { useTree } from "../../hooks/useTree";
import { useVirtualizer } from "../../hooks/useVirtualiser";
import { useKeyboard } from "../../hooks/useKeyboard";
import { flatten } from "../../utils/tree";

const ROW_HEIGHT = 32;

export default function Combobox() {
  const { tree, loadRoot, expandNode, toggleSelect, selectedIds } = useTree();

  useEffect(() => {
    loadRoot();
  }, []);

  // flatten hierarchical tree into visible rows
  const flat = useMemo(() => flatten(tree), [tree]);

  const virtual = useVirtualizer(flat, ROW_HEIGHT);
  const keyboard = useKeyboard(flat.length);

  return (
    <div>


      <div
        style={{
          height: 300,
          overflow: "auto",
          border: "1px solid #ccc",
          position: "relative"
        }}
        onScroll={virtual.onScroll}
        onKeyDown={keyboard.onKeyDown}
        tabIndex={0}
        role="tree"
      >
        <div style={{ height: virtual.totalHeight, position: "relative" }}>
          <div
            style={{
              transform: `translateY(${virtual.offset}px)`
            }}
          >
            {virtual.visible.map((node: any, i: number) => {
              const index = flat.indexOf(node);
              const focused = keyboard.focused === index;

              return (
                <div
                  key={node.id}
                  role="treeitem"
                  aria-expanded={node.expanded}
                  aria-selected={selectedIds.has(node.id)}
                  aria-level={node.level + 1}
                  tabIndex={focused ? 0 : -1}
                  style={{
                    height: ROW_HEIGHT,
                    paddingLeft: node.level * 20,
                    display: "flex",
                    alignItems: "center",
                    background: focused ? "#eef" : "transparent"
                  }}
                >
                  {node.hasChildren && (
                    <button onClick={() => expandNode(node)}>▶</button>
                  )}

                  <input
                    type="checkbox"
                    checked={selectedIds.has(node.id)}
                    onChange={() => toggleSelect(node.id)}
                  />

                  <span style={{ marginLeft: 6 }}>{node.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
