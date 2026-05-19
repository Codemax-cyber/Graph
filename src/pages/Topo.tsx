import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraphVisualizer } from "@/components/GraphVisualizer";
import { CodeBlock, ComplexityBadge, InfoCard } from "@/components/CodeBlock";
import { TOPO_GRAPH } from "@/lib/graphData";
import { computeTopologicalSteps } from "@/lib/algorithms/topological";

const PSEUDO = `// Kahn's Algorithm (BFS-based)
TopologicalSort(G):
  Tính in-degree cho mỗi đỉnh
  queue = {v : in-degree[v] == 0}
  result = []

  while queue is not empty:
    u = queue.dequeue()
    result.append(u)
    for each (u, v) in edges:
      in-degree[v] -= 1
      if in-degree[v] == 0:
        queue.enqueue(v)

  if len(result) != |V|:
    return "Đồ thị có chu trình!"
  return result`;

const CODE = `from collections import deque

def topological_sort(graph, vertices):
    in_degree = {v: 0 for v in vertices}
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1

    queue = deque(
        [v for v in vertices if in_degree[v] == 0]
    )
    result = []

    while queue:
        u = queue.popleft()
        result.append(u)
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    if len(result) != len(vertices):
        raise ValueError("Đồ thị có chu trình!")
    return result

# DFS-based approach:
def topo_dfs(graph, vertices):
    visited, stack = set(), []
    def dfs(v):
        visited.add(v)
        for u in graph.get(v, []):
            if u not in visited:
                dfs(u)
        stack.append(v)
    for v in vertices:
        if v not in visited:
            dfs(v)
    return stack[::-1]`;

export default function Topo() {
  const steps = useMemo(() => computeTopologicalSteps(TOPO_GRAPH), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Sắp xếp đặc biệt</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Sắp xếp Tô-pô</h1>
        <p className="text-muted-foreground text-lg">
          Sắp xếp tuyến tính các đỉnh của DAG sao cho mọi cạnh (u, v) đều có u xuất hiện trước v.
        </p>
      </div>

      <div className="mb-4 p-3 rounded-lg border border-fuchsia-700/40 bg-fuchsia-900/10 text-sm text-fuchsia-300">
        Đồ thị này là DAG (Directed Acyclic Graph). Thuật toán dùng Kahn's Algorithm (BFS-based).
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <GraphVisualizer graph={TOPO_GRAPH} steps={steps} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <InfoCard title="Ý tưởng">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">In-degree</strong> của một đỉnh = số cạnh đi vào nó. 
              Kahn's Algorithm lặp lại: lấy đỉnh có in-degree = 0, thêm vào kết quả, 
              giảm in-degree của các đỉnh kề.
            </p>
          </InfoCard>
          <InfoCard title="Độ phức tạp">
            <ComplexityBadge time="O(V + E)" space="O(V)" />
          </InfoCard>
          <InfoCard title="DAG là gì?">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Directed Acyclic Graph</strong> — đồ thị có hướng, 
              không chứa chu trình. Nếu tồn tại chu trình, không thể sắp xếp tô-pô.
            </p>
          </InfoCard>
          <InfoCard title="Ứng dụng">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>— Lập lịch công việc (task scheduling)</li>
              <li>— Quản lý phụ thuộc (npm, Maven, pip)</li>
              <li>— Trình tự biên dịch (build systems)</li>
              <li>— Lập thời khóa biểu đại học</li>
              <li>— Xử lý luồng dữ liệu (data pipeline)</li>
            </ul>
          </InfoCard>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Kahn's Algorithm (Pseudocode)">
          <CodeBlock code={PSEUDO} />
        </InfoCard>
        <InfoCard title="Python (Kahn + DFS)">
          <CodeBlock code={CODE} language="python" />
        </InfoCard>
      </div>
    </motion.div>
  );
}
