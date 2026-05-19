import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraphVisualizer } from "@/components/GraphVisualizer";
import { CodeBlock, ComplexityBadge, InfoCard } from "@/components/CodeBlock";
import { BFS_GRAPH } from "@/lib/graphData";
import { computeBFSSteps } from "@/lib/algorithms/bfs";

const PSEUDO = `BFS(G, s):
  visited = {s}
  queue  = [s]

  while queue is not empty:
    u = queue.dequeue()
    for each neighbor v of u:
      if v not in visited:
        visited.add(v)
        queue.enqueue(v)`;

const CODE = `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue   = deque([start])
    order   = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order`;

export default function BFS() {
  const steps = useMemo(() => computeBFSSteps(BFS_GRAPH, "A"), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Thuật toán duyệt</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Breadth-First Search</h1>
        <p className="text-muted-foreground text-lg">
          Duyệt đồ thị theo chiều rộng — khám phá tất cả đỉnh theo từng lớp, từ gần đến xa.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <GraphVisualizer graph={BFS_GRAPH} steps={steps} startNode="A" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <InfoCard title="Ý tưởng">
            <p className="text-sm text-muted-foreground leading-relaxed">
              BFS dùng <strong className="text-foreground">hàng đợi (queue)</strong> để duyệt đồ thị. 
              Bắt đầu từ đỉnh nguồn, thăm tất cả đỉnh ở khoảng cách 1 trước, rồi khoảng cách 2, v.v.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Đảm bảo tìm được <strong className="text-foreground">đường đi ngắn nhất</strong> (số cạnh) 
              trong đồ thị không trọng số.
            </p>
          </InfoCard>
          <InfoCard title="Độ phức tạp">
            <ComplexityBadge time="O(V + E)" space="O(V)" />
            <p className="text-xs text-muted-foreground mt-2">V = số đỉnh, E = số cạnh</p>
          </InfoCard>
          <InfoCard title="Ứng dụng">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>— Tìm đường đi ngắn nhất (unweighted)</li>
              <li>— Kiểm tra đồ thị liên thông</li>
              <li>— Tìm kiếm theo cấp độ (Level Order)</li>
              <li>— Web crawling, mạng xã hội</li>
              <li>— Giải puzzle (Rubik's, 15-puzzle)</li>
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

      <div className="mt-6">
        <InfoCard title="So sánh BFS vs DFS">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Tiêu chí</th>
                  <th className="text-center py-2 text-teal-400 font-medium">BFS</th>
                  <th className="text-center py-2 text-violet-400 font-medium">DFS</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Cấu trúc dữ liệu", "Queue (FIFO)", "Stack (LIFO)"],
                  ["Đường ngắn nhất", "Có (unweighted)", "Không đảm bảo"],
                  ["Bộ nhớ", "O(V) — nhiều hơn", "O(depth) — ít hơn"],
                  ["Phù hợp cho", "Đồ thị rộng, nông", "Đồ thị sâu, hẹp"],
                ].map(([crit, bfs, dfs]) => (
                  <tr key={crit} className="border-b border-border/50 last:border-0">
                    <td className="py-2 pr-4 text-foreground">{crit}</td>
                    <td className="py-2 text-center">{bfs}</td>
                    <td className="py-2 text-center">{dfs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfoCard>
      </div>
    </motion.div>
  );
}
