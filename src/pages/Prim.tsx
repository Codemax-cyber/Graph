import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraphVisualizer } from "@/components/GraphVisualizer";
import { CodeBlock, ComplexityBadge, InfoCard } from "@/components/CodeBlock";
import { PRIM_GRAPH } from "@/lib/graphData";
import { computePrimSteps } from "@/lib/algorithms/prim";

const PSEUDO = `Prim(G, r):
  key[r] = 0,  key[v] = ∞  for v ≠ r
  parent[v] = NULL for all v
  Q = all vertices (min-heap by key)

  while Q is not empty:
    u = extract_min(Q)
    for each (u, v, w) in edges:
      if v in Q and w < key[v]:
        parent[v] = u
        key[v] = w       // cập nhật trong heap
  
  MST = {(parent[v], v) : v ≠ r}`;

const CODE = `import heapq

def prim(graph, start):
    # graph: {node: [(neighbor, weight), ...]}
    visited = set()
    key     = {node: float('inf') for node in graph}
    parent  = {node: None for node in graph}
    key[start] = 0
    heap = [(0, start)]  # (key, node)
    mst  = []

    while heap:
        k, u = heapq.heappop(heap)
        if u in visited:
            continue
        visited.add(u)
        if parent[u] is not None:
            mst.append((parent[u], u, k))

        for v, w in graph[u]:
            if v not in visited and w < key[v]:
                key[v]    = w
                parent[v] = u
                heapq.heappush(heap, (w, v))

    return mst`;

export default function Prim() {
  const steps = useMemo(() => computePrimSteps(PRIM_GRAPH, "A"), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Cây khung nhỏ nhất</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Prim MST</h1>
        <p className="text-muted-foreground text-lg">
          Xây dựng cây khung nhỏ nhất bằng cách mở rộng từ một đỉnh khởi đầu, thêm từng cạnh có trọng số nhỏ nhất.
        </p>
      </div>

      <div className="mb-4 p-3 rounded-lg border border-cyan-700/40 bg-cyan-900/10 text-sm text-cyan-300">
        Số trên mỗi đỉnh là key — trọng số cạnh nhỏ nhất nối đỉnh đó với MST đang xây dựng.
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <GraphVisualizer graph={PRIM_GRAPH} steps={steps} startNode="A" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <InfoCard title="Ý tưởng">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Prim duy trì một <strong className="text-foreground">tập đỉnh đã thuộc MST</strong>. 
              Mỗi bước, chọn cạnh rẻ nhất nối một đỉnh trong MST với một đỉnh ngoài MST.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Giống Dijkstra nhưng thay vì tối thiểu hóa khoảng cách tổng, Prim tối thiểu hóa 
              trọng số <strong className="text-foreground">cạnh cuối</strong> được thêm vào.
            </p>
          </InfoCard>
          <InfoCard title="Độ phức tạp">
            <ComplexityBadge time="O((V+E) log V)" space="O(V)" />
            <p className="text-xs text-muted-foreground mt-2">Với binary heap. O(E + V log V) với Fibonacci heap.</p>
          </InfoCard>
          <InfoCard title="Kruskal vs Prim">
            <div className="text-sm text-muted-foreground space-y-2">
              <div><strong className="text-foreground">Kruskal:</strong> Tốt hơn cho đồ thị thưa (E nhỏ). Xét cạnh toàn cục.</div>
              <div><strong className="text-foreground">Prim:</strong> Tốt hơn cho đồ thị dày (E lớn). Phát triển cục bộ từ một đỉnh.</div>
            </div>
          </InfoCard>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Pseudocode">
          <CodeBlock code={PSEUDO} />
        </InfoCard>
        <InfoCard title="Python Implementation">
          <CodeBlock code={CODE} language="python" />
        </InfoCard>
      </div>
    </motion.div>
  );
}
