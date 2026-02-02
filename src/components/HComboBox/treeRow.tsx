import Checkbox from "./CheckBox";

type Props = {
  node: any;
  focused: boolean;
  selected: boolean;
  indeterminate: boolean;
  onExpand: () => void;
  onSelect: () => void;
};

export default function TreeRow({
  node,
  focused,
  selected,
  indeterminate,
  onExpand,
  onSelect
}: Props) {
  return (
    <div
      role="treeitem"
      aria-expanded={node.expanded}
      aria-selected={selected}
      aria-level={node.level + 1}
      tabIndex={focused ? 0 : -1}
      style={{
        height: 32,
        paddingLeft: node.level * 20,
        display: "flex",
        alignItems: "center",
        background: focused ? "#eef" : "transparent"
      }}
    >
      {node.hasChildren && (
        <button onClick={onExpand}>
          {node.expanded ? "▼" : "▶"}
        </button>
      )}

      <Checkbox
        checked={selected}
        indeterminate={indeterminate}
        onChange={onSelect}
      />

      <span style={{ marginLeft: 6 }}>{node.label}</span>
    </div>
  );
}
