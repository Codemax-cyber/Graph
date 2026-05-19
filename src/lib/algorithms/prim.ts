import { GraphData, AlgorithmStep } from "../types";

const INF = Infinity;

export function computePrimSteps(graph: GraphData, startId: string): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const inMST = new Set<string>();
  const key: Record<string, number> = {};
  const parent: Record<string, string | null> = {};
  const mstEdges: [string, string][] = [];

  for (const n of graph.nodes) { key[n.id] = INF; parent[n.id] = null; }
  key[startId] = 0;

  const adj: Record<string, { to: string; weight: number }[]> = {};
  for (const n of graph.nodes) adj[n.id] = [];
  for (const e of graph.edges) {
    adj[e.from].push({ to: e.to, weight: e.weight ?? 1 });
    adj[e.to].push({ to: e.from, weight: e.weight ?? 1 });
  }

  steps.push({
    visited: [],
    current: null,
    inQueue: [startId],
    activeEdge: null,
    mstEdges: [],
    distances: { ...key },
    description: `Khởi tạo Prim: key[${startId}]=0, bắt đầu từ đỉnh ${startId}.`,
  });

  for (let iter = 0; iter < graph.nodes.length; iter++) {
    let u: string | null = null;
    let minKey = INF;
    for (const id of graph.nodes.map((n) => n.id)) {
      if (!inMST.has(id) && key[id] < minKey) {
        minKey = key[id];
        u = id;
      }
    }
    if (!u) break;

    inMST.add(u);
    if (parent[u]) mstEdges.push([parent[u]!, u]);

    steps.push({
      visited: [...inMST],
      current: u,
      inQueue: graph.nodes.map((n) => n.id).filter((id) => !inMST.has(id) && key[id] < INF),
      activeEdge: parent[u] ? [parent[u]!, u] : null,
      mstEdges: [...mstEdges],
      distances: { ...key },
      description: `Thêm đỉnh ${u} vào MST${parent[u] ? ` qua cạnh (${parent[u]}, ${u}, w=${minKey})` : " (điểm khởi đầu)"}.`,
    });

    for (const { to: v, weight: w } of adj[u]) {
      if (!inMST.has(v) && w < key[v]) {
        key[v] = w;
        parent[v] = u;
        steps.push({
          visited: [...inMST],
          current: u,
          inQueue: graph.nodes.map((n) => n.id).filter((id) => !inMST.has(id) && key[id] < INF),
          activeEdge: [u, v],
          mstEdges: [...mstEdges],
          distances: { ...key },
          description: `Cập nhật: key[${v}] = ${w} (cạnh ${u}→${v} có trọng số nhỏ hơn).`,
        });
      }
    }
  }

  const totalWeight = mstEdges.reduce((sum, [f, t]) => {
    const edge = graph.edges.find((e) => (e.from === f && e.to === t) || (e.from === t && e.to === f));
    return sum + (edge?.weight ?? 1);
  }, 0);

  steps.push({
    visited: [...inMST],
    current: null,
    inQueue: [],
    activeEdge: null,
    mstEdges: [...mstEdges],
    distances: { ...key },
    description: `Hoàn thành Prim MST! Tổng trọng số = ${totalWeight}.`,
  });

  return steps;
}
