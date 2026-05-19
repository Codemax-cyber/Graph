import { GraphData, AlgorithmStep } from "../types";

export function computeDFSSteps(graph: GraphData, startId: string): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const visited = new Set<string>();
  const stack: string[] = [];
  const adj = buildAdj(graph);
  const visitOrder: string[] = [];

  steps.push({
    visited: [],
    current: null,
    inQueue: [startId],
    activeEdge: null,
    description: `Khởi tạo: Đẩy đỉnh ${startId} vào ngăn xếp (stack).`,
  });

  stack.push(startId);

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (visited.has(node)) {
      steps.push({
        visited: [...visited],
        current: node,
        inQueue: [...stack],
        activeEdge: null,
        description: `Lấy đỉnh ${node} ra khỏi ngăn xếp — đã thăm, bỏ qua.`,
      });
      continue;
    }

    visited.add(node);
    visitOrder.push(node);

    steps.push({
      visited: [...visited],
      current: node,
      inQueue: [...stack],
      activeEdge: null,
      description: `Thăm đỉnh ${node}. Ngăn xếp hiện tại: [${[...stack].join(", ")}].`,
    });

    const neighbors = [...(adj[node] || [])].reverse();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        steps.push({
          visited: [...visited],
          current: node,
          inQueue: [...stack],
          activeEdge: [node, neighbor],
          description: `Đẩy đỉnh ${neighbor} vào ngăn xếp (chưa thăm).`,
        });
      }
    }
  }

  steps.push({
    visited: [...visited],
    current: null,
    inQueue: [],
    activeEdge: null,
    description: `Hoàn thành DFS! Thứ tự thăm: ${visitOrder.join(" → ")}.`,
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
