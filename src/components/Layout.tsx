import React from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Network, BookOpen, Layers, Search, 
  Map, Infinity, Waypoints, Orbit, ChevronRight, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MENU_ITEMS = [
  { href: "/", label: "Trang chủ", icon: Network },
  { href: "/ly-thuyet", label: "Lý Thuyết Cơ Bản", icon: BookOpen },
  { href: "/bfs", label: "Breadth-First Search", icon: Layers },
  { href: "/dfs", label: "Depth-First Search", icon: Search },
  { href: "/dijkstra", label: "Thuật toán Dijkstra", icon: Map },
  { href: "/bellman-ford", label: "Bellman-Ford", icon: Infinity },
  { href: "/kruskal", label: "Kruskal MST", icon: Waypoints },
  { href: "/prim", label: "Prim MST", icon: Waypoints },
  { href: "/topo", label: "Sắp xếp Tô-pô", icon: Orbit },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2 font-bold text-lg text-primary">
          <Network className="w-6 h-6" />
          <span>Lý Thuyết Đồ Thị</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 border-b border-border hidden md:flex items-center gap-2 font-bold text-xl text-primary">
          <Network className="w-6 h-6" />
          <span>Lý Thuyết Đồ Thị</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {MENU_ITEMS.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setIsMobileOpen(false)}>
                    <div className={`
                      flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium cursor-pointer
                      ${isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }
                    `}>
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
}