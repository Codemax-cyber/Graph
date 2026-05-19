import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Network, BookOpen, Layers, Search, Map, Waypoints, Orbit, GitBranch } from "lucide-react";

const ALGORITHMS = [
  {
    href: "/bfs",
    icon: Layers,
    name: "BFS",
    fullName: "Breadth-First Search",
    desc: "Duyệt đồ thị theo chiều rộng — khám phá tất cả đỉnh theo từng lớp.",
    color: "from-teal-500/10 to-teal-600/5 border-teal-700/40",
    iconColor: "text-teal-400",
  },
  {
    href: "/dfs",
    icon: Search,
    name: "DFS",
    fullName: "Depth-First Search",
    desc: "Duyệt đồ thị theo chiều sâu — đi sâu nhất có thể trước khi quay lại.",
    color: "from-violet-500/10 to-violet-600/5 border-violet-700/40",
    iconColor: "text-violet-400",
  },
  {
    href: "/dijkstra",
    icon: Map,
    name: "Dijkstra",
    fullName: "Thuật toán Dijkstra",
    desc: "Tìm đường đi ngắn nhất từ một đỉnh đến tất cả đỉnh khác (trọng số không âm).",
    color: "from-amber-500/10 to-amber-600/5 border-amber-700/40",
    iconColor: "text-amber-400",
  },
  {
    href: "/bellman-ford",
    icon: GitBranch,
    name: "Bellman-Ford",
    fullName: "Thuật toán Bellman-Ford",
    desc: "Đường đi ngắn nhất với trọng số âm, phát hiện chu trình âm.",
    color: "from-rose-500/10 to-rose-600/5 border-rose-700/40",
    iconColor: "text-rose-400",
  },
  {
    href: "/kruskal",
    icon: Waypoints,
    name: "Kruskal",
    fullName: "Kruskal MST",
    desc: "Cây khung nhỏ nhất (Minimum Spanning Tree) dùng Union-Find.",
    color: "from-sky-500/10 to-sky-600/5 border-sky-700/40",
    iconColor: "text-sky-400",
  },
  {
    href: "/prim",
    icon: Waypoints,
    name: "Prim",
    fullName: "Prim MST",
    desc: "Cây khung nhỏ nhất phát triển từ một đỉnh, mở rộng từng bước.",
    color: "from-cyan-500/10 to-cyan-600/5 border-cyan-700/40",
    iconColor: "text-cyan-400",
  },
  {
    href: "/topo",
    icon: Orbit,
    name: "Tô-pô",
    fullName: "Sắp xếp Tô-pô",
    desc: "Sắp xếp các đỉnh của DAG theo thứ tự tuyến tính.",
    color: "from-fuchsia-500/10 to-fuchsia-600/5 border-fuchsia-700/40",
    iconColor: "text-fuchsia-400",
  },
];

function AnimatedGraph() {
  const nodes = [
    { cx: 80, cy: 80 }, { cx: 200, cy: 40 }, { cx: 320, cy: 90 },
    { cx: 140, cy: 170 }, { cx: 260, cy: 160 }, { cx: 380, cy: 60 },
  ];
  const edges = [[0,1],[1,2],[0,3],[1,3],[1,4],[2,4],[2,5],[4,3]];

  return (
    <svg viewBox="0 0 460 220" className="w-full opacity-20">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="#0d9488" strokeWidth="1.5"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="16" fill="#0d9488" opacity="0.6" />
      ))}
    </svg>
  );
}

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="relative rounded-2xl border border-teal-800/40 bg-gradient-to-br from-teal-900/20 to-[#0b1120] overflow-hidden p-8 md:p-12">
          <div className="absolute inset-0 pointer-events-none">
            <AnimatedGraph />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Network className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-mono text-teal-400 uppercase tracking-widest">Lý Thuyết Đồ Thị</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Đồ thị &amp; Thuật toán<br />
              <span className="text-teal-400">Trực quan hóa tương tác</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
              Học lý thuyết đồ thị và các thuật toán duyệt qua hình ảnh động. 
              Xem từng bước thực thi của BFS, DFS, Dijkstra và nhiều thuật toán khác.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/ly-thuyet">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-sm transition-colors cursor-pointer">
                  <BookOpen className="w-4 h-4" />
                  Bắt đầu học
                </div>
              </Link>
              <Link href="/bfs">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-secondary text-foreground text-sm transition-colors cursor-pointer">
                  Xem BFS
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Theory card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <Link href="/ly-thuyet">
          <div className="group rounded-xl border border-border hover:border-teal-700/60 bg-card p-6 flex items-center justify-between cursor-pointer transition-all hover:bg-card/80">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-teal-900/30 border border-teal-700/30">
                <BookOpen className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Lý Thuyết Cơ Bản</h2>
                <p className="text-sm text-muted-foreground">Đỉnh, cạnh, bậc, đường đi, chu trình, ma trận kề, danh sách kề...</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-teal-400 transition-colors" />
          </div>
        </Link>
      </motion.div>

      {/* Algorithm grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-5">Thuật toán</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALGORITHMS.map((algo, i) => {
            const Icon = algo.icon;
            return (
              <motion.div
                key={algo.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              >
                <Link href={algo.href}>
                  <div className={`group rounded-xl border bg-gradient-to-br ${algo.color} p-5 cursor-pointer hover:scale-[1.02] transition-all duration-200 h-full`}>
                    <div className="flex items-start gap-3 mb-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${algo.iconColor}`} />
                      <div>
                        <div className="font-bold text-foreground">{algo.name}</div>
                        <div className="text-xs text-muted-foreground">{algo.fullName}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{algo.desc}</p>
                    <div className={`flex items-center gap-1 mt-3 text-xs ${algo.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Xem trực quan hóa <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
