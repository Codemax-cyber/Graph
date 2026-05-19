export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
  directed?: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
  weighted: boolean;
}

export interface AlgorithmStep {
  visited: string[];
  current: string | null;
  inQueue: string[];
  activeEdge: [string, string] | null;
  distances?: Record<string, number>;
  parent?: Record<string, string | null>;
  mstEdges?: [string, string][];
  description: string;
}
