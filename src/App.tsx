import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Theory from "@/pages/Theory";
import BFS from "@/pages/BFS";
import DFS from "@/pages/DFS";
import Dijkstra from "@/pages/Dijkstra";
import BellmanFord from "@/pages/BellmanFord";
import Kruskal from "@/pages/Kruskal";
import Prim from "@/pages/Prim";
import Topo from "@/pages/Topo";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ly-thuyet" component={Theory} />
        <Route path="/bfs" component={BFS} />
        <Route path="/dfs" component={DFS} />
        <Route path="/dijkstra" component={Dijkstra} />
        <Route path="/bellman-ford" component={BellmanFord} />
        <Route path="/kruskal" component={Kruskal} />
        <Route path="/prim" component={Prim} />
        <Route path="/topo" component={Topo} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
