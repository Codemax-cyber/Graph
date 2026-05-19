# 🌐 Lý Thuyết Đồ Thị

> Ứng dụng học tương tác về lý thuyết đồ thị và các thuật toán duyệt đồ thị — hoàn toàn bằng tiếng Việt.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

---

## ✨ Tính Năng

- 🎯 **7 thuật toán** với trực quan hóa từng bước bằng SVG animation
- ▶️ **Điều khiển linh hoạt** — Chạy, Dừng, Bước tiếp, Bước trước, Đặt lại
- ⚡ **Tốc độ tùy chỉnh** — Thanh trượt từ chậm đến nhanh
- 📊 **Hiển thị trạng thái** — Hàng đợi / Ngăn xếp và đỉnh đã thăm cập nhật theo thời gian thực
- 💬 **Giải thích tiếng Việt** — Mô tả chi tiết từng bước dễ hiểu
- 🧩 **Pseudocode + Python** — Kèm theo code mẫu cho mỗi thuật toán
- 📚 **Lý thuyết đầy đủ** — Đỉnh, cạnh, bậc, đường đi, ma trận kề, danh sách kề

---

## 📖 Các Thuật Toán

| Thuật Toán | Loại | Độ Phức Tạp | Ứng Dụng Thực Tế |
|---|---|---|---|
| **BFS** — Tìm kiếm theo chiều rộng | Duyệt đồ thị | O(V + E) | Đường đi ngắn nhất (không trọng số) |
| **DFS** — Tìm kiếm theo chiều sâu | Duyệt đồ thị | O(V + E) | Phát hiện chu trình, mê cung |
| **Dijkstra** | Đường đi ngắn nhất | O((V+E) log V) | GPS, định tuyến mạng |
| **Bellman-Ford** | Đường đi ngắn nhất | O(V × E) | Hỗ trợ cạnh trọng số âm |
| **Kruskal** | Cây khung nhỏ nhất | O(E log E) | Thiết kế mạng lưới tối ưu |
| **Prim** | Cây khung nhỏ nhất | O((V+E) log V) | Mạng điện, cáp ngầm |
| **Sắp xếp Tô-pô** | Thứ tự tuyến tính | O(V + E) | Lịch trình, phụ thuộc gói phần mềm |

---

## 🚀 Chạy Dự Án

### Yêu cầu
- Node.js 18+
- pnpm 9+

### Cài đặt

```bash
# Clone repository
git clone https://github.com/Codemax-cyber/Graph.git
cd Graph

# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm dev
```

Mở trình duyệt và truy cập `http://localhost:5173`

---

## 🗂️ Cấu Trúc Dự Án

```
src/
├── components/
│   ├── GraphVisualizer.tsx   # SVG canvas trực quan hóa đồ thị
│   ├── Layout.tsx            # Sidebar navigation
│   └── CodeBlock.tsx         # Hiển thị pseudocode
├── lib/
│   ├── algorithms/
│   │   ├── bfs.ts            # BFS engine
│   │   ├── dfs.ts            # DFS engine
│   │   ├── dijkstra.ts       # Dijkstra engine
│   │   ├── bellmanFord.ts    # Bellman-Ford engine
│   │   ├── kruskal.ts        # Kruskal MST engine
│   │   ├── prim.ts           # Prim MST engine
│   │   └── topological.ts    # Topological Sort engine
│   ├── graphData.ts          # Dữ liệu đồ thị mẫu
│   └── types.ts              # TypeScript types
└── pages/
    ├── Home.tsx              # Trang chủ
    ├── Theory.tsx            # Lý thuyết cơ bản
    ├── BFS.tsx
    ├── DFS.tsx
    ├── Dijkstra.tsx
    ├── BellmanFord.tsx
    ├── Kruskal.tsx
    ├── Prim.tsx
    └── Topo.tsx
```

---

## 🛠️ Công Nghệ Sử Dụng

| Công nghệ | Mục đích |
|---|---|
| **React 18** + **TypeScript** | UI framework với type safety |
| **Vite 5** | Build tool siêu nhanh |
| **Tailwind CSS v4** | Styling tiện lợi |
| **Framer Motion** | Animation mượt mà |
| **Wouter** | Client-side routing nhẹ |
| **shadcn/ui** | Component library đẹp |
| **Lucide React** | Icon set hiện đại |

---

## 🎨 Giao Diện

- 🌑 **Dark mode** mặc định với nền navy xanh đậm
- 🟢 **Màu sắc node** thể hiện trạng thái: chưa thăm → đang xét → đã thăm
- 📐 **SVG thuần** — Không cần thư viện đồ thị bên ngoài
- 🖥️ **Responsive** — Hoạt động tốt trên mọi kích thước màn hình

---

## 📄 Giấy Phép

MIT © [Codemax-cyber](https://github.com/Codemax-cyber)
