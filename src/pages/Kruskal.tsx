import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraphVisualizer } from "@/components/GraphVisualizer";
import { CodeBlock, ComplexityBadge, InfoCard } from "@/components/CodeBlock";
import { KRUSKAL_GRAPH } from "@/lib/graphData";
import { computeKruskalSteps } from "@/lib/algorithms/kruskal";

const PSEUDO = `Kruskal(G):
  MST = {}
  Sort edges by weight ascending
  Initialize Union-Find for all vertices

  for each edge (u, v, w) in sorted order:
    if find(u) ≠ find(v):   // không cùng component
      MST.add(u, v, w)
      union(u, v)
    if |MST| == |V| - 1:
      break

  return MST`;

const CODE = `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank   = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True

def kruskal(vertices, edges):
    uf  = UnionFind(len(vertices))
    mst = []
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        if uf.union(u, v):
            mst.append((u, v, w))
        if len(mst) == len(vertices) - 1:
            break
    return mst`;

export default function Kruskal() {
  const steps = useMemo(() => computeKruskalSteps(KRUSKAL_GRAPH), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Cây khung nhỏ nhất</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Kruskal MST</h1>
        <p className="text-muted-foreground text-lg">
          Tìm cây khung nhỏ nhất (Minimum Spanning Tree) bằng cách chọn cạnh theo trọng số tăng dần, tránh chu trình.
        </p>
      </div>

      <div className="mb-4 p-3 rounded-lg border border-teal-700/40 bg-teal-900/10 text-sm text-teal-300">
        Các cạnh màu teal là cạnh thuộc MST. Bấm "Chạy" để xem Kruskal chọn từng cạnh.
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <GraphVisualizer graph={KRUSKAL_GRAPH} steps={steps} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <InfoCard title="Ý tưởng">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kruskal là thuật toán <strong className="text-foreground">tham lam</strong>: sắp xếp tất cả 
              cạnh theo trọng số tăng dần, rồi lần lượt thêm cạnh vào MST nếu không tạo chu trình.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Dùng <strong className="text-foreground">Union-Find (Disjoint Set Union)</strong> để kiểm tra 
              chu trình hiệu quả trong O(α(V)) ≈ O(1).
            </p>
          </InfoCard>
          <InfoCard title="Độ phức tạp">
            <ComplexityBadge time="O(E log E)" space="O(V)" />
            <p className="text-xs text-muted-foreground mt-2">Thống trị bởi bước sắp xếp cạnh.</p>
          </InfoCard>
          <InfoCard title="MST là gì?">
            <p className="text-sm text-muted-foreground">
              Cây khung nhỏ nhất của đồ thị G là cây con (spanning tree) nối tất cả đỉnh với 
              <strong className="text-foreground"> tổng trọng số nhỏ nhất</strong>. 
              Có |V|-1 cạnh, không có chu trình.
            </p>
          </InfoCard>
          <InfoCard title="Ứng dụng">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>— Thiết kế mạng điện, viễn thông</li>
              <li>— Phân cụm dữ liệu (clustering)</li>
              <li>— Xấp xỉ bài toán Travelling Salesman</li>
              <li>— Xây dựng đường đi tối thiểu</li>
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
