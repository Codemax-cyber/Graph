import { GraphData } from "./types";

export const BFS_GRAPH: GraphData = {
  directed: false,
  weighted: false,
  nodes: [
    { id: "A", label: "A", x: 280, y: 60 },
    { id: "B", label: "B", x: 140, y: 170 },
    { id: "C", label: "C", x: 420, y: 170 },
    { id: "D", label: "D", x: 60,  y: 290 },
    { id: "E", label: "E", x: 220, y: 290 },
    { id: "F", label: "F", x: 500, y: 290 },
    { id: "G", label: "G", x: 280, y: 390 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "B", to: "E" },
    { from: "C", to: "F" },
    { from: "E", to: "G" },
  ],
};

export const DFS_GRAPH: GraphData = {
  directed: false,
  weighted: false,
  nodes: [
    { id: "A", label: "A", x: 280, y: 60 },
    { id: "B", label: "B", x: 140, y: 170 },
    { id: "C", label: "C", x: 420, y: 170 },
    { id: "D", label: "D", x: 60,  y: 290 },
    { id: "E", label: "E", x: 220, y: 290 },
    { id: "F", label: "F", x: 500, y: 290 },
    { id: "G", label: "G", x: 280, y: 390 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "B", to: "E" },
    { from: "C", to: "F" },
    { from: "E", to: "G" },
  ],
};

export const DIJKSTRA_GRAPH: GraphData = {
  directed: true,
  weighted: true,
  nodes: [
    { id: "A", label: "A", x: 80,  y: 200 },
    { id: "B", label: "B", x: 240, y: 80  },
    { id: "C", label: "C", x: 240, y: 320 },
    { id: "D", label: "D", x: 400, y: 80  },
    { id: "E", label: "E", x: 400, y: 320 },
    { id: "F", label: "F", x: 540, y: 200 },
  ],
  edges: [
    { from: "A", to: "B", weight: 4, directed: true },
    { from: "A", to: "C", weight: 2, directed: true },
    { from: "C", to: "B", weight: 1, directed: true },
    { from: "B", to: "D", weight: 5, directed: true },
    { from: "C", to: "E", weight: 10, directed: true },
    { from: "B", to: "E", weight: 3, directed: true },
    { from: "D", to: "F", weight: 2, directed: true },
    { from: "E", to: "F", weight: 4, directed: true },
  ],
};

export const BELLMAN_FORD_GRAPH: GraphData = {
  directed: true,
  weighted: true,
  nodes: [
    { id: "S", label: "S", x: 80,  y: 200 },
    { id: "A", label: "A", x: 250, y: 80  },
    { id: "B", label: "B", x: 250, y: 320 },
    { id: "C", label: "C", x: 420, y: 80  },
    { id: "D", label: "D", x: 420, y: 320 },
    { id: "T", label: "T", x: 560, y: 200 },
  ],
  edges: [
    { from: "S", to: "A", weight: 6, directed: true },
    { from: "S", to: "B", weight: 7, directed: true },
    { from: "A", to: "C", weight: 5, directed: true },
    { from: "A", to: "B", weight: 8, directed: true },
    { from: "A", to: "D", weight: -4, directed: true },
    { from: "B", to: "D", weight: 9, directed: true },
    { from: "B", to: "C", weight: -3, directed: true },
    { from: "C", to: "T", weight: -2, directed: true },
    { from: "D", to: "C", weight: 7, directed: true },
    { from: "D", to: "T", weight: 2, directed: true },
  ],
};

export const KRUSKAL_GRAPH: GraphData = {
  directed: false,
  weighted: true,
  nodes: [
    { id: "A", label: "A", x: 80,  y: 200 },
    { id: "B", label: "B", x: 230, y: 80  },
    { id: "C", label: "C", x: 230, y: 320 },
    { id: "D", label: "D", x: 390, y: 80  },
    { id: "E", label: "E", x: 390, y: 320 },
    { id: "F", label: "F", x: 540, y: 200 },
  ],
  edges: [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "C", weight: 1 },
    { from: "B", to: "D", weight: 5 },
    { from: "C", to: "E", weight: 8 },
    { from: "B", to: "E", weight: 11 },
    { from: "D", to: "E", weight: 2 },
    { from: "D", to: "F", weight: 6 },
    { from: "E", to: "F", weight: 7 },
  ],
};

export const PRIM_GRAPH: GraphData = {
  directed: false,
  weighted: true,
  nodes: [
    { id: "A", label: "A", x: 80,  y: 200 },
    { id: "B", label: "B", x: 230, y: 80  },
    { id: "C", label: "C", x: 230, y: 320 },
    { id: "D", label: "D", x: 390, y: 80  },
    { id: "E", label: "E", x: 390, y: 320 },
    { id: "F", label: "F", x: 540, y: 200 },
  ],
  edges: [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "C", weight: 1 },
    { from: "B", to: "D", weight: 5 },
    { from: "C", to: "E", weight: 8 },
    { from: "B", to: "E", weight: 11 },
    { from: "D", to: "E", weight: 2 },
    { from: "D", to: "F", weight: 6 },
    { from: "E", to: "F", weight: 7 },
  ],
};

export const TOPO_GRAPH: GraphData = {
  directed: true,
  weighted: false,
  nodes: [
    { id: "A", label: "A", x: 80,  y: 200 },
    { id: "B", label: "B", x: 230, y: 100 },
    { id: "C", label: "C", x: 230, y: 300 },
    { id: "D", label: "D", x: 380, y: 100 },
    { id: "E", label: "E", x: 380, y: 300 },
    { id: "F", label: "F", x: 530, y: 200 },
  ],
  edges: [
    { from: "A", to: "B", directed: true },
    { from: "A", to: "C", directed: true },
    { from: "B", to: "D", directed: true },
    { from: "C", to: "D", directed: true },
    { from: "C", to: "E", directed: true },
    { from: "D", to: "F", directed: true },
    { from: "E", to: "F", directed: true },
  ],
};
