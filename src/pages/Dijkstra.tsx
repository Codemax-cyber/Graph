import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraphVisualizer } from "@/components/GraphVisualizer";
import { CodeBlock, ComplexityBadge, InfoCard } from "@/components/CodeBlock";
import { DIJKSTRA_GRAPH } from "@/lib/graphData";
import { computeDijkstraSteps } from "@/lib/algorithms/dijkstra";

const PSEUDO = `Dijkstra(G, s):
  dist[s] = 0
  dist[v] = ∞  for all v ≠ s
  Q = all vertices (min-heap by dist)

  while Q is not empty:
    u = extract_min(Q)        // đỉnh có dist nhỏ nhất
    for each (u, v, w) in edges:
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
        parent[v] = u
        decrease_key(Q, v)`;

const CODE = `import heapq

def dijkstra(graph, start):
    # graph: {node: [(neighbor, weight), ...]}
    dist   = {node: float('inf') for node in graph}
    dist[start] = 0
    parent = {node: None for node in graph}
    heap   = [(0, start)]  # (distance, node)

    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:   # đã xử lý rồi
            continue
        for v, w in graph[u]:
            new_d = dist[u] + w
            if new_d < dist[v]:
                dist[v]   = new_d
                parent[v] = u
                heapq.heappush(heap, (new_d, v))

    return dist, parent`;

export default function Dijkstra() {
  const steps = useMemo(() => computeDijkstraSteps(DIJKSTRA_GRAPH, "A"), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Đường đi ngắn nhất</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Thuật toán Dijkstra</h1>
        <p className="text-muted-foreground text-lg">
          Tìm đường đi ngắn nhất từ một đỉnh nguồn đến tất cả đỉnh còn lại trong đồ thị có trọng số không âm.
        </p>
      </div>

      <div className="mb-4 p-3 rounded-lg border border-amber-700/40 bg-amber-900/10 text-sm text-amber-300">
        Số trên mỗi đỉnh là khoảng cách ngắn nhất hiện tại từ đỉnh A. <strong>∞</strong> = chưa đến được.
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <GraphVisualizer graph={DIJKSTRA_GRAPH} steps={steps} startNode="A" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <InfoCard title="Ý tưởng">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dựa trên <strong className="text-foreground">tham lam (greedy)</strong>: mỗi bước chọn đỉnh 
              chưa thăm có khoảng cách nhỏ nhất, cập nhật khoảng cách cho các đỉnh kề.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Dùng <strong className="text-foreground">min-heap (priority queue)</strong> để tìm đỉnh 
              có khoảng cách nhỏ nhất hiệu quả — O(log V) thay vì O(V).
            </p>
          </InfoCard>
          <InfoCard title="Độ phức tạp">
            <ComplexityBadge time="O((V+E) log V)" space="O(V)" />
            <p className="text-xs text-muted-foreground mt-2">Với binary heap. O(V²) nếu dùng mảng đơn giản.</p>
          </InfoCard>
          <InfoCard title="Giới hạn quan trọng">
            <div className="p-3 rounded bg-rose-900/20 border border-rose-700/30 text-sm text-rose-300">
              Dijkstra KHÔNG hoạt động với cạnh có trọng số âm. Dùng Bellman-Ford thay thế.
            </div>
          </InfoCard>
          <InfoCard title="Ứng dụng">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>— GPS / Google Maps routing</li>
              <li>— Giao thức định tuyến OSPF</li>
              <li>— Lập lịch dự án (CPM)</li>
              <li>— Mạng viễn thông</li>
            </ul>
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
