import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraphVisualizer } from "@/components/GraphVisualizer";
import { CodeBlock, ComplexityBadge, InfoCard } from "@/components/CodeBlock";
import { DFS_GRAPH } from "@/lib/graphData";
import { computeDFSSteps } from "@/lib/algorithms/dfs";

const PSEUDO = `DFS(G, s):
  stack = [s]
  visited = {}

  while stack is not empty:
    u = stack.pop()
    if u in visited: continue
    visited.add(u)
    for each neighbor v of u:
      if v not in visited:
        stack.push(v)

# Đệ quy (recursive):
DFS_Recursive(G, u, visited):
  visited.add(u)
  for each neighbor v of u:
    if v not in visited:
      DFS_Recursive(G, v, visited)`;

const CODE = `def dfs_iterative(graph, start):
    visited = set()
    stack   = [start]
    order   = []

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        order.append(node)
        for neighbor in reversed(graph[node]):
            if neighbor not in visited:
                stack.append(neighbor)
    return order

def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    return visited`;

export default function DFS() {
  const steps = useMemo(() => computeDFSSteps(DFS_GRAPH, "A"), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Thuật toán duyệt</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Depth-First Search</h1>
        <p className="text-muted-foreground text-lg">
          Duyệt đồ thị theo chiều sâu — đi sâu nhất có thể theo một nhánh trước khi quay lại.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <GraphVisualizer graph={DFS_GRAPH} steps={steps} startNode="A" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <InfoCard title="Ý tưởng">
            <p className="text-sm text-muted-foreground leading-relaxed">
              DFS dùng <strong className="text-foreground">ngăn xếp (stack)</strong> — hoặc đệ quy — 
              để luôn đi sâu vào nhánh hiện tại. Khi không thể tiếp tục, quay lui (backtrack) để thử nhánh khác.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              DFS là nền tảng của nhiều thuật toán quan trọng: phát hiện chu trình, sắp xếp tô-pô, 
              tìm thành phần liên thông mạnh.
            </p>
          </InfoCard>
          <InfoCard title="Độ phức tạp">
            <ComplexityBadge time="O(V + E)" space="O(V)" />
            <p className="text-xs text-muted-foreground mt-2">Bộ nhớ phụ thuộc vào độ sâu của đệ quy.</p>
          </InfoCard>
          <InfoCard title="Ứng dụng">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>— Phát hiện chu trình trong đồ thị</li>
              <li>— Sắp xếp tô-pô (Topological Sort)</li>
              <li>— Tìm thành phần liên thông mạnh (Tarjan, Kosaraju)</li>
              <li>— Giải mê cung (maze solving)</li>
              <li>— Phân tích cú pháp (parsing)</li>
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
        <InfoCard title="Iterative vs Recursive DFS">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <div className="font-semibold text-violet-400 mb-2">Iterative (Stack)</div>
              <ul className="space-y-1">
                <li>+ Không bị stack overflow</li>
                <li>+ Kiểm soát bộ nhớ tốt hơn</li>
                <li>- Code phức tạp hơn đôi chút</li>
                <li>- Thứ tự thăm có thể khác đệ quy</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-teal-400 mb-2">Recursive</div>
              <ul className="space-y-1">
                <li>+ Code ngắn gọn, dễ đọc</li>
                <li>+ Thứ tự tự nhiên hơn</li>
                <li>- Nguy cơ stack overflow (đồ thị sâu)</li>
                <li>- Khó kiểm soát call stack</li>
              </ul>
            </div>
          </div>
        </InfoCard>
      </div>
    </motion.div>
  );
}
