export type TTree<T> = {
  children?: TTree<T>[];
} & T;

export default function arrayToTree<T>(list: T[], { id, parentId }: { id: string; parentId: string }): TTree<T>[] | [] {
  /** map between id and array position */
  const map: number[] = [];
  const treeList: TTree<T>[] = list as TTree<T>[];

  for (let i = 0; i < treeList.length; i += 1) {
    /** initialize the map */
    map[(treeList[i] as TTree<T> & { [id: string]: number })[id]] = i;
    /** initialize the children */
    // treeList[i].children = [];
  }

  let node: TTree<T> & { [parentId: string]: number };
  /** return value */
  const roots: TTree<T>[] = [];

  for (const item of treeList) {
    node = item as TTree<T> & { [parentId: string]: number };

    if (treeList.find(t => t[id] === item[parentId])) {
      const item = treeList[map[node[parentId]]];
      if (item) {
        if (item.children) {
          item.children.push(node);
        } else {
          item.children = [node];
        }
      }
    } else {
      roots.push(node);
    }
  }
  return roots;
}
