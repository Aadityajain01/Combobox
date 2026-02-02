import { useState } from "react";
import { fetchChildren } from "../api/faketree";

export type TreeNode = {
  id: string;
  label: string;
  level: number;
  hasChildren: boolean;
  children?: TreeNode[];
  expanded?: boolean;
};

export function useTree() {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  async function loadRoot() {
    const root = await fetchChildren();
    setTree(root.map(n => ({ ...n, level: 0 })));
  }

  async function expandNode(node: TreeNode) {
    if (node.children) {
      toggleExpand(node.id);
      return;
    }

    const kids = await fetchChildren(node.id);

    setTree(prev => insertChildren(prev, node.id, kids));
  }

  function toggleExpand(id: string) {
    setTree(prev => toggleNode(prev, id));
  }

  function toggleSelect(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return {
    tree,
    loadRoot,
    expandNode,
    toggleSelect,
    selectedIds
  };
}

/* helpers */

function toggleNode(nodes: TreeNode[], id: string): TreeNode[] {
  return nodes.map(n => {
    if (n.id === id) return { ...n, expanded: !n.expanded };
    if (n.children) return { ...n, children: toggleNode(n.children, id) };
    return n;
  });
}

function insertChildren(nodes: TreeNode[], id: string, kids: any[]): TreeNode[] {
  return nodes.map(n => {
    if (n.id === id)
      return {
        ...n,
        expanded: true,
        children: kids.map(k => ({ ...k, level: n.level + 1 }))
      };

    if (n.children)
      return { ...n, children: insertChildren(n.children, id, kids) };

    return n;
  });
}
