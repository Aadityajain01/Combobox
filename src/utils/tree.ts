export interface TreeNode<T extends TreeNode<T> = any> {
    expanded?: boolean;
    children?: T[];
}

export type FlattenedNode<T extends TreeNode<T>> = T & { level: number };

export function flatten<T extends TreeNode<T>>(
    nodes: T[],
    level = 0
): FlattenedNode<T>[] {
    let result: FlattenedNode<T>[] = [];

    for (const node of nodes) {
        result.push({ ...node, level });

        if (node.expanded && node.children) {
            result = result.concat(flatten(node.children, level + 1));
        }
    }

    return result;
}
