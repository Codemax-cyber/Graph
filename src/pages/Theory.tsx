import { motion } from "framer-motion";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">{title}</h2>
      {children}
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold text-teal-400 mb-2">{title}</h3>
      <div className="text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function Term({ t, d }: { t: string; d: string }) {
  return (
    <div className="flex gap-3 py-2 border-b border-border/50 last:border-0">
      <span className="font-mono text-sm font-bold text-primary w-40 shrink-0">{t}</span>
      <span className="text-sm text-muted-foreground">{d}</span>
    </div>
  );
}

function MatrixCode() {
  return (
    <pre className="rounded-lg bg-[#0b1120] border border-border p-4 text-sm font-mono text-slate-300 overflow-x-auto">
{`    A  B  C  D
A [ 0  1  1  0 ]
B [ 1  0  0  1 ]
C [ 1  0  0  1 ]
D [ 0  1  1  0 ]`}
    </pre>
  );
}

function AdjListCode() {
  return (
    <pre className="rounded-lg bg-[#0b1120] border border-border p-4 text-sm font-mono text-slate-300 overflow-x-auto">
{`A: [B, C]
B: [A, D]
C: [A, D]
D: [B, C]`}
    </pre>
  );
}

export default function Theory() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-6 py-10"
    >
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-3">Lý Thuyết Đồ Thị</h1>
        <p className="text-muted-foreground text-lg">
          Nền tảng lý thuyết đồ thị — từ định nghĩa cơ bản đến các cấu trúc biểu diễn quan trọng.
        </p>
      </div>

      <Section title="1. Đồ thị là gì?">
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Đồ thị (Graph)</strong> G = (V, E) là một cấu trúc toán học gồm:
        </p>
        <div className="ml-4 space-y-1 mb-4">
          <p className="text-muted-foreground">— <strong className="text-foreground">V (Vertices)</strong>: Tập hợp các <strong>đỉnh</strong> (nodes). Ví dụ: thành phố, người dùng, trang web.</p>
          <p className="text-muted-foreground">— <strong className="text-foreground">E (Edges)</strong>: Tập hợp các <strong>cạnh</strong> (edges) nối các đỉnh. Ví dụ: đường đi, mối quan hệ, liên kết.</p>
        </div>
        <div className="rounded-lg bg-muted/30 border border-border p-4 font-mono text-sm text-foreground">
          G = (V, E) &nbsp;|&nbsp; V = &#123;A, B, C, D&#125; &nbsp;|&nbsp; E = &#123;(A,B), (B,C), (C,D), (A,D)&#125;
        </div>
      </Section>

      <Section title="2. Các khái niệm cơ bản">
        <div className="space-y-1">
          <Term t="Đỉnh (Vertex)" d="Một nút trong đồ thị, thường biểu diễn bằng một ký tự hoặc số." />
          <Term t="Cạnh (Edge)" d="Kết nối giữa hai đỉnh, có thể có trọng số (weighted) hoặc không." />
          <Term t="Bậc (Degree)" d="Số cạnh liên kết với một đỉnh. Ký hiệu: deg(v)." />
          <Term t="Đường đi (Path)" d="Dãy các đỉnh liên tiếp nhau qua các cạnh, không lặp đỉnh." />
          <Term t="Chu trình (Cycle)" d="Đường đi bắt đầu và kết thúc tại cùng một đỉnh." />
          <Term t="Đồ thị liên thông" d="Mọi cặp đỉnh đều có đường đi nối với nhau." />
          <Term t="Cây (Tree)" d="Đồ thị vô hướng liên thông và không có chu trình." />
          <Term t="DAG" d="Directed Acyclic Graph — đồ thị có hướng không có chu trình." />
          <Term t="Đỉnh kề (Neighbor)" d="Hai đỉnh u, v kề nhau nếu tồn tại cạnh (u, v) trong E." />
        </div>
      </Section>

      <Section title="3. Phân loại đồ thị">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: "Đồ thị vô hướng", desc: "Cạnh không có chiều. Nếu có cạnh (u,v) thì cũng có (v,u). Ví dụ: mạng xã hội đơn giản.", color: "border-teal-700/40 bg-teal-900/10" },
            { name: "Đồ thị có hướng (Digraph)", desc: "Cạnh có chiều xác định. (u,v) ≠ (v,u). Ví dụ: Twitter follow, web link.", color: "border-violet-700/40 bg-violet-900/10" },
            { name: "Đồ thị có trọng số", desc: "Mỗi cạnh gắn với một giá trị (trọng số). Ví dụ: khoảng cách, chi phí, thời gian.", color: "border-amber-700/40 bg-amber-900/10" },
            { name: "Đồ thị không trọng số", desc: "Tất cả cạnh có giá trị bằng nhau (mặc định = 1). Chỉ quan tâm sự liên kết.", color: "border-slate-700/40 bg-slate-800/20" },
            { name: "Đồ thị thưa (Sparse)", desc: "Số cạnh E << V². Dùng danh sách kề để biểu diễn hiệu quả.", color: "border-sky-700/40 bg-sky-900/10" },
            { name: "Đồ thị dày (Dense)", desc: "Số cạnh E ≈ V². Dùng ma trận kề để biểu diễn và truy cập nhanh.", color: "border-rose-700/40 bg-rose-900/10" },
          ].map((item) => (
            <div key={item.name} className={`rounded-lg border ${item.color} p-4`}>
              <div className="font-semibold text-foreground text-sm mb-1">{item.name}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="4. Biểu diễn đồ thị">
        <Sub title="4.1 Ma trận kề (Adjacency Matrix)">
          <p>Ma trận vuông n×n, trong đó A[i][j] = 1 nếu có cạnh (i,j), = 0 nếu không.</p>
          <MatrixCode />
          <div className="flex gap-4 mt-3 text-xs">
            <div className="text-green-400">+ Kiểm tra cạnh O(1)</div>
            <div className="text-rose-400">- Bộ nhớ O(V²)</div>
          </div>
        </Sub>
        <Sub title="4.2 Danh sách kề (Adjacency List)">
          <p>Mỗi đỉnh lưu danh sách các đỉnh kề. Phù hợp cho đồ thị thưa.</p>
          <AdjListCode />
          <div className="flex gap-4 mt-3 text-xs">
            <div className="text-green-400">+ Bộ nhớ O(V+E)</div>
            <div className="text-rose-400">- Kiểm tra cạnh O(degree)</div>
          </div>
        </Sub>
      </Section>

      <Section title="5. Độ phức tạp so sánh">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Thao tác</th>
                <th className="text-center px-4 py-2.5 text-muted-foreground font-medium">Ma trận kề</th>
                <th className="text-center px-4 py-2.5 text-muted-foreground font-medium">Danh sách kề</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Kiểm tra cạnh (u,v)", "O(1)", "O(deg(u))"],
                ["Tìm tất cả đỉnh kề u", "O(V)", "O(deg(u))"],
                ["Thêm cạnh", "O(1)", "O(1)"],
                ["Xóa cạnh", "O(1)", "O(deg(u))"],
                ["Bộ nhớ", "O(V²)", "O(V+E)"],
              ].map(([op, mat, lst]) => (
                <tr key={op} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-2.5 text-foreground">{op}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-amber-400">{mat}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-teal-400">{lst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </motion.div>
  );
}
