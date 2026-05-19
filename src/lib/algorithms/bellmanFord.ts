import { GraphData, AlgorithmStep } from "../types";

const INF = Infinity;

export function computeBellmanFordSteps(graph: GraphData, startId: string): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const dist: Record<string, number> = {};
  const parent: Record<string, string | null> = {};

  for (const n of graph.nodes) {
    dist[n.id] = INF;
    parent[n.id] = null;
  }
  dist[startId] = 0;

  steps.push({
    visited: [startId],
    current: null,
    inQueue: [],
    activeEdge: null,
    distances: { ...dist },
    parent: { ...parent },
    description: `Khởi tạo: d[${startId}]=0, mọi đỉnh khác=∞. Bellman-Ford sẽ thực hiện |V|-1=${graph.nodes.length - 1} vòng lặp.`,
  });

  const V = graph.nodes.length;

  for (let i = 1; i <= V - 1; i++) {
    let updated = false;

    steps.push({
      visited: Object.keys(dist).filter((k) => dist[k] < INF),
      current: null,
      inQueue: [],
      activeEdge: null,
      distances: { ...dist },
      parent: { ...parent },
      description: `Vòng lặp thứ ${i}/${V - 1}: Duyệt qua tất cả các cạnh.`,
    });

    for (const edge of graph.edges) {
      const edges: [string, string][] = [[edge.from, edge.to]];
      if (!graph.directed) edges.push([edge.to, edge.from]);

      for (const [u, v] of edges) {
        if (dist[u] === INF) continue;
        const w = edge.weight ?? 1;
        const newDist = dist[u] + w;

        if (newDist < dist[v]) {
          dist[v] = newDist;
          parent[v] = u;
          updated = true;
          steps.push({
            visited: Object.keys(dist).filter((k) => dist[k] < INF),
            current: v,
            inQueue: [],
            activeEdge: [u, v],
            distances: { ...dist },
            parent: { ...parent },
            description: `Cập nhật cạnh (${u}→${v}, w=${w}): d[${v}] = ${newDist}.`,
          });
        }
      }
    }

    if (!updated) {
      steps.push({
        visited: Object.keys(dist).filter((k) => dist[k] < INF),
        current: null,
        inQueue: [],
        activeEdge: null,
        distances: { ...dist },
        parent: { ...parent },
        description: `Vòng lặp ${i}: Không có cập nhật nào. Thuật toán kết thúc sớm.`,
      });
      break;
    }
  }

  steps.push({
    visited: Object.keys(dist).filter((k) => dist[k] < INF),
    current: null,
    inQueue: [],
    activeEdge: null,
    distances: { ...dist },
    parent: { ...parent },
    description: `Hoàn thành Bellman-Ford! Khoảng cách: ${Object.entries(dist)
      .map(([k, v]) => `${k}=${v === INF ? "∞" : v}`)
      .join(", ")}.`,
  });

  return steps;
}
