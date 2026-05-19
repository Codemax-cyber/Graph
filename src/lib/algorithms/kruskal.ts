import { GraphData, AlgorithmStep } from "../types";

function makeUnionFind(nodes: string[]) {
  const parent: Record<string, string> = {};
  const rank: Record<string, number> = {};
  for (const n of nodes) { parent[n] = n; rank[n] = 0; }
  function find(x: string): string {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  function union(x: string, y: string): boolean {
    const px = find(x), py = find(y);
    if (px === py) return false;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  }
  return { find, union };
}

export function computeKruskalSteps(graph: GraphData): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const mstEdges: [string, string][] = [];
  const nodeIds = graph.nodes.map((n) => n.id);
  const uf = makeUnionFind(nodeIds);

  const sortedEdges = [...graph.edges].sort((a, b) => (a.weight ?? 1) - (b.weight ?? 1));

  steps.push({
    visited: [],
    current: null,
    inQueue: [],
    activeEdge: null,
    mstEdges: [],
    description: `Khởi tạo Kruskal: Sắp xếp ${sortedEdges.length} cạnh theo trọng số tăng dần.`,
  });

  for (const edge of sortedEdges) {
    const { from, to, weight } = edge;

    steps.push({
      visited: [],
      current: null,
      inQueue: [],
      activeEdge: [from, to],
      mstEdges: [...mstEdges],
      description: `Xét cạnh (${from}, ${to}, w=${weight}): Kiểm tra có tạo chu trình không?`,
    });

    if (uf.union(from, to)) {
      mstEdges.push([from, to]);
      steps.push({
        visited: [...new Set(mstEdges.flat())],
        current: null,
        inQueue: [],
        activeEdge: [from, to],
        mstEdges: [...mstEdges],
        description: `Thêm cạnh (${from}, ${to}, w=${weight}) vào MST. Tổng số cạnh MST: ${mstEdges.length}.`,
      });
    } else {
      steps.push({
        visited: [...new Set(mstEdges.flat())],
        current: null,
        inQueue: [],
        activeEdge: [from, to],
        mstEdges: [...mstEdges],
        description: `Cạnh (${from}, ${to}) tạo chu trình — bỏ qua.`,
      });
    }

    if (mstEdges.length === graph.nodes.length - 1) break;
  }

  const totalWeight = mstEdges.reduce((sum, [f, t]) => {
    const edge = graph.edges.find((e) => (e.from === f && e.to === t) || (e.from === t && e.to === f));
    return sum + (edge?.weight ?? 1);
  }, 0);

  steps.push({
    visited: [...new Set(mstEdges.flat())],
    current: null,
    inQueue: [],
    activeEdge: null,
    mstEdges: [...mstEdges],
    description: `Hoàn thành Kruskal MST! Tổng trọng số = ${totalWeight}. Số cạnh = ${mstEdges.length}.`,
  });

  return steps;
}
