import { GraphData, AlgorithmStep } from "../types";

export function computeBFSSteps(graph: GraphData, startId: string): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [];

  const adj = buildAdj(graph);

  steps.push({
    visited: [],
    current: null,
    inQueue: [startId],
    activeEdge: null,
    description: `Khởi tạo: Thêm đỉnh ${startId} vào hàng đợi (queue).`,
  });

  queue.push(startId);
  visited.add(startId);

  while (queue.length > 0) {
    const node = queue.shift()!;

    steps.push({
      visited: [...visited],
      current: node,
      inQueue: [...queue],
      activeEdge: null,
      description: `Lấy đỉnh ${node} ra khỏi hàng đợi. Đang xử lý...`,
    });

    const neighbors = adj[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        steps.push({
          visited: [...visited],
          current: node,
          inQueue: [...queue],
          activeEdge: [node, neighbor],
          description: `Thêm đỉnh lân cận ${neighbor} vào hàng đợi (chưa thăm).`,
        });
      } else {
        steps.push({
          visited: [...visited],
          current: node,
          inQueue: [...queue],
          activeEdge: [node, neighbor],
          description: `Đỉnh ${neighbor} đã được thăm, bỏ qua.`,
        });
      }
    }
  }

  steps.push({
    visited: [...visited],
    current: null,
    inQueue: [],
    activeEdge: null,
    description: `Hoàn thành BFS! Thứ tự thăm: ${[...visited].join(" → ")}.`,
  });

  return steps;
}

function buildAdj(graph: GraphData): Record<string, string[]> {
  const adj: Record<string, string[]> = {};
  for (const node of graph.nodes) adj[node.id] = [];
  for (const edge of graph.edges) {
    adj[edge.from].push(edge.to);
    if (!graph.directed) adj[edge.to].push(edge.from);
  }
  return adj;
}
