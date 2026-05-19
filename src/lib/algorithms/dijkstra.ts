import { GraphData, AlgorithmStep } from "../types";

const INF = Infinity;

export function computeDijkstraSteps(graph: GraphData, startId: string): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const dist: Record<string, number> = {};
  const parent: Record<string, string | null> = {};
  const visited = new Set<string>();

  for (const n of graph.nodes) {
    dist[n.id] = INF;
    parent[n.id] = null;
  }
  dist[startId] = 0;

  steps.push({
    visited: [],
    current: null,
    inQueue: [startId],
    activeEdge: null,
    distances: { ...dist },
    parent: { ...parent },
    description: `Khởi tạo: d[${startId}]=0, mọi đỉnh khác = ∞. Thêm ${startId} vào hàng đợi ưu tiên.`,
  });

  const unvisited = new Set(graph.nodes.map((n) => n.id));

  while (unvisited.size > 0) {
    // Pick min dist unvisited
    let u: string | null = null;
    let minD = INF;
    for (const id of unvisited) {
      if (dist[id] < minD) {
        minD = dist[id];
        u = id;
      }
    }
    if (u === null || minD === INF) break;

    unvisited.delete(u);
    visited.add(u);

    steps.push({
      visited: [...visited],
      current: u,
      inQueue: [...unvisited].filter((id) => dist[id] < INF),
      activeEdge: null,
      distances: { ...dist },
      parent: { ...parent },
      description: `Chọn đỉnh ${u} (khoảng cách nhỏ nhất = ${minD}). Cập nhật các đỉnh lân cận.`,
    });

    for (const edge of graph.edges) {
      let v: string | null = null;
      if (edge.from === u) v = edge.to;
      else if (!graph.directed && edge.to === u) v = edge.from;
      if (!v || visited.has(v)) continue;

      const w = edge.weight ?? 1;
      const edgeFrom = edge.from === u ? u : v;
      const edgeTo = edge.from === u ? v : u;
      const newDist = dist[u] + w;

      if (newDist < dist[v]) {
        dist[v] = newDist;
        parent[v] = u;
        steps.push({
          visited: [...visited],
          current: u,
          inQueue: [...unvisited].filter((id) => dist[id] < INF),
          activeEdge: [edgeFrom, edgeTo],
          distances: { ...dist },
          parent: { ...parent },
          description: `Cập nhật: d[${v}] = d[${u}] + ${w} = ${newDist} (cải thiện từ ${dist[v] === newDist ? "∞" : dist[v] + w}).`,
        });
      } else {
        steps.push({
          visited: [...visited],
          current: u,
          inQueue: [...unvisited].filter((id) => dist[id] < INF),
          activeEdge: [edgeFrom, edgeTo],
          distances: { ...dist },
          parent: { ...parent },
          description: `Cạnh (${u}, ${v}): d[${v}]=${dist[v]} ≤ d[${u}]+${w}=${newDist}, không cập nhật.`,
        });
      }
    }
  }

  steps.push({
    visited: [...visited],
    current: null,
    inQueue: [],
    activeEdge: null,
    distances: { ...dist },
    parent: { ...parent },
    description: `Hoàn thành Dijkstra! Khoảng cách ngắn nhất từ ${startId}: ${Object.entries(dist)
      .map(([k, v]) => `${k}=${v === INF ? "∞" : v}`)
      .join(", ")}.`,
  });

  return steps;
}
