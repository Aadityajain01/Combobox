export type TreeNode = {
  id: string;
  label: string;
  hasChildren: boolean;
};

/* ---------------- MOCK DATABASE ---------------- */

const DB: Record<string, TreeNode[]> = {
  root: [
    { id: "1", label: "India", hasChildren: true },
    { id: "2", label: "USA", hasChildren: true }
  ],

  "1": [
    { id: "1-1", label: "Rajasthan", hasChildren: true },
    { id: "1-2", label: "Delhi", hasChildren: false }
  ],

  "1-1": [
    { id: "1-1-1", label: "Jaipur", hasChildren: false },
    { id: "1-1-2", label: "Udaipur", hasChildren: false }
  ],

  "2": [
    { id: "2-1", label: "California", hasChildren: true }
  ],

  "2-1": [
    { id: "2-1-1", label: "San Francisco", hasChildren: false }
  ]
};

/* ---------------- UTILS ---------------- */

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ---------------- ASYNC TREE LOADER ---------------- */

/**
 * Loads children of any node asynchronously
 * Simulates network latency + random failure
 */
export async function fetchChildren(parentId = "root"): Promise<TreeNode[]> {
  await delay(600); // ⬅ fake network latency

  // simulate backend failure
  if (Math.random() < 0.1) {
    throw new Error("Network error");
  }

  return DB[parentId] || [];
}

/* ---------------- ASYNC SEARCH ---------------- */

export async function searchNodes(query: string): Promise<TreeNode[]> {
  await delay(500);

  const all = Object.values(DB).flat();

  return all.filter(n =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );
}
