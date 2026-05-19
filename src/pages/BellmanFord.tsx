import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraphVisualizer } from "@/components/GraphVisualizer";
import { CodeBlock, ComplexityBadge, InfoCard } from "@/components/CodeBlock";
import { BELLMAN_FORD_GRAPH } from "@/lib/graphData";
import { computeBellmanFordSteps } from "@/lib/algorithms/bellmanFord";

const PSEUDO = `BellmanFord(G, s):
  dist[s] = 0
  dist[v] = ∞  for all v ≠ s

  repeat |V| - 1 times:
    for each edge (u, v, w) in G.edges:
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w

  // Kiểm tra chu trình âm:
  for each edge (u, v, w) in G.edges:
    if dist[u] + w < dist[v]:
      return "Có chu trình âm!"`;

const CODE = `def bellman_ford(graph, vertices, start):
    # graph: [(u, v, w), ...]
    dist = {v: float('inf') for v in vertices}
    dist[start] = 0

    # Lặp |V| - 1 lần
    for _ in range(len(vertices) - 1):
        updated = False
        for u, v, w in graph:
            if dist[u] + w < dist[v]:
                dist[v]  = dist[u] + w
                updated  = True
        if not updated:
            break  # Tối ưu sớm

    # Kiểm tra chu trình âm
    for u, v, w in graph:
        if dist[u] + w < dist[v]:
            return None  # Có chu trình âm

    return dist`;

export default function BellmanFord() {
  const steps = useMemo(() => computeBellmanFordSteps(BELLMAN_FORD_GRAPH, "S"), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Đường đi ngắn nhất</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Bellman-Ford</h1>
        <p className="text-muted-foreground text-lg">
          Tìm đường đi ngắn nhất trong đồ thị có trọng số âm, đồng thời phát hiện chu trình âm.
        </p>
      </div>

      <div className="mb-4 p-3 rounded-lg border border-rose-700/40 bg-rose-900/10 text-sm text-rose-300">
        Đồ thị này có cạnh trọng số âm (ví dụ: A→D = -4, A→B_inv = ...). Bellman-Ford xử lý được trường hợp này.
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <GraphVisualizer graph={BELLMAN_FORD_GRAPH} steps={steps} startNode="S" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <InfoCard title="Ý tưởng">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bellman-Ford thực hiện <strong className="text-foreground">|V|-1 vòng lặp</strong>, 
              mỗi vòng duyệt qua tất cả cạnh và thư giãn (relax) nếu tìm được đường ngắn hơn.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Sau |V|-1 vòng, nếu vẫn còn thể cập nhật — có <strong className="text-foreground">chu trình âm</strong>.
            </p>
          </InfoCard>
          <InfoCard title="Độ phức tạp">
            <ComplexityBadge time="O(V × E)" space="O(V)" />
            <p className="text-xs text-muted-foreground mt-2">Chậm hơn Dijkstra nhưng tổng quát hơn.</p>
          </InfoCard>
          <InfoCard title="Dijkstra vs Bellman-Ford">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 text-muted-foreground">Tiêu chí</th>
                    <th className="text-center py-1.5 text-amber-400">Dijkstra</th>
                    <th className="text-center py-1.5 text-rose-400">Bellman-Ford</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["Trọng số âm", "Không", "Có"],
                    ["Phát hiện CTV âm", "Không", "Có"],
                    ["Tốc độ", "Nhanh hơn", "Chậm hơn"],
                    ["Độ phức tạp", "O((V+E)logV)", "O(V·E)"],
                  ].map(([c, d, b]) => (
                    <tr key={c} className="border-b border-border/40 last:border-0">
                      <td className="py-1.5 text-foreground">{c}</td>
                      <td className="py-1.5 text-center">{d}</td>
                      <td className="py-1.5 text-center">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
