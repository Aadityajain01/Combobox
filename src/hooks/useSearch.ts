export function useSearch() {
  function searchTree(nodes: any[], query: string): any[] {
    if (!query) return nodes;

    const result = [];

    for (const node of nodes) {
      if (node.label.toLowerCase().includes(query.toLowerCase())) {
        result.push(node);
      }

      if (node.children) {
        const kids = searchTree(node.children, query);
        if (kids.length) result.push({ ...node, children: kids });
      }
    }

    return result;
  }

  return { searchTree };
}
