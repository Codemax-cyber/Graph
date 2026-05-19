import { GraphData, AlgorithmStep } from "../types";

export function computeTopologicalSteps(graph: GraphData): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const inDegree: Record<string, number> = {};
  const adj: Record<string, string[]> = {};

  for (const n of graph.nodes) { inDegree[n.id] = 0; adj[n.id] = []; }
  for (const e of graph.edges) {
    adj[e.from].push(e.to);
    inDegree[e.to]++;
  }

  const queue: string[] = Object.keys(inDegree).filter((id) => inDegree[id] === 0);
  const result: string[] = [];
  const visited = new Set<string>();

  steps.push({
    visited: [],
    current: null,
    inQueue: [...queue],
    activeEdge: null,
    description: `Khởi tạo: Tìm tất cả đỉnh có bậc vào (in-degree) = 0: [${queue.join(", ")}].`,
  });

  while (queue.length > 0) {
    const u = queue.shift()!;
    result.push(u);
    visited.add(u);

    steps.push({
      visited: [...visited],
      current: u,
      inQueue: [...queue],
      activeEdge: null,
      description: `Lấy đỉnh ${u} ra. Thứ tự hiện tại: [${result.join(" → ")}].`,
    });

    for (const v of adj[u]) {
      inDegree[v]--;
      steps.push({
        visited: [...visited],
        current: u,
        inQueue: [...queue],
        activeEdge: [u, v],
        description: `Giảm in-degree của ${v} xuống ${inDegree[v]}.${inDegree[v] === 0 ? ` Thêm ${v} vào hàng đợi.` : ""}`,
      });
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  if (result.length !== graph.nodes.length) {
    steps.push({
      visited: [...visited],
      current: null,
      inQueue: [],
      activeEdge: null,
      description: `Phát hiện chu trình! Đồ thị không phải DAG — không thể sắp xếp tô-pô.`,
    });
  } else {
    steps.push({
      visited: [...visited],
      current: null,
      inQueue: [],
      activeEdge: null,
      description: `Hoàn thành! Thứ tự tô-pô: ${result.join(" → ")}.`,
    });
  }

  return steps;
}
