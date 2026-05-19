import { useState, useEffect, useRef, useCallback } from "react";
import { GraphData, AlgorithmStep } from "@/lib/types";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface GraphVisualizerProps {
  graph: GraphData;
  steps: AlgorithmStep[];
  startNode?: string;
}

const NODE_RADIUS = 22;

function getNodeColor(id: string, step: AlgorithmStep) {
  if (step.current === id) return { fill: "#f59e0b", stroke: "#d97706", text: "#1a1a1a" };
  if (step.visited.includes(id)) return { fill: "#0d9488", stroke: "#0f766e", text: "#fff" };
  if (step.inQueue.includes(id)) return { fill: "#7c3aed", stroke: "#6d28d9", text: "#fff" };
  return { fill: "#1e293b", stroke: "#334155", text: "#94a3b8" };
}

function getEdgeColor(from: string, to: string, step: AlgorithmStep, mstMode: boolean) {
  const ae = step.activeEdge;
  if (ae && ((ae[0] === from && ae[1] === to) || (ae[0] === to && ae[1] === from))) {
    return "#f59e0b";
  }
  if (mstMode && step.mstEdges) {
    for (const [f, t] of step.mstEdges) {
      if ((f === from && t === to) || (f === to && t === from)) return "#0d9488";
    }
  }
  return "#334155";
}

function getEdgeWidth(from: string, to: string, step: AlgorithmStep, mstMode: boolean) {
  const ae = step.activeEdge;
  if (ae && ((ae[0] === from && ae[1] === to) || (ae[0] === to && ae[1] === from))) return 3;
  if (mstMode && step.mstEdges) {
    for (const [f, t] of step.mstEdges) {
      if ((f === from && t === to) || (f === to && t === from)) return 2.5;
    }
  }
  return 1.5;
}

export function GraphVisualizer({ graph, steps }: GraphVisualizerProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mstMode = steps.some((s) => s.mstEdges !== undefined);

  const step = steps[stepIdx];

  const next = useCallback(() => {
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);

  const prev = () => setStepIdx((i) => Math.max(i - 1, 0));
  const reset = () => { setStepIdx(0); setPlaying(false); };
  const goFirst = () => { setStepIdx(0); setPlaying(false); };
  const goLast = () => { setStepIdx(steps.length - 1); setPlaying(false); };

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStepIdx((i) => {
          if (i >= steps.length - 1) { setPlaying(false); return i; }
          return i + 1;
        });
      }, 1200 / speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, speed, steps.length]);

  const nodeMap = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));

  const svgW = 620;
  const svgH = 460;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* SVG Canvas */}
      <div className="relative bg-[#0b1120] p-2">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          width="100%"
          style={{ display: "block", maxHeight: 360 }}
        >
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#334155" />
            </marker>
            <marker id="arrow-active" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-mst" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#0d9488" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {graph.edges.map((edge, i) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;

            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ux = dx / dist;
            const uy = dy / dist;
            const x1 = from.x + ux * NODE_RADIUS;
            const y1 = from.y + uy * NODE_RADIUS;
            const x2 = to.x - ux * (NODE_RADIUS + (graph.directed ? 8 : 0));
            const y2 = to.y - uy * (NODE_RADIUS + (graph.directed ? 8 : 0));

            const color = getEdgeColor(edge.from, edge.to, step, mstMode);
            const width = getEdgeWidth(edge.from, edge.to, step, mstMode);
            const isActive = step.activeEdge && (
              (step.activeEdge[0] === edge.from && step.activeEdge[1] === edge.to) ||
              (step.activeEdge[0] === edge.to && step.activeEdge[1] === edge.from)
            );
            const isMst = mstMode && step.mstEdges?.some(([f, t]) =>
              (f === edge.from && t === edge.to) || (f === edge.to && t === edge.from)
            );

            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;

            return (
              <g key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={color}
                  strokeWidth={width}
                  markerEnd={graph.directed ? (isActive ? "url(#arrow-active)" : isMst ? "url(#arrow-mst)" : "url(#arrow)") : undefined}
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                  filter={isActive ? "url(#glow)" : undefined}
                />
                {graph.weighted && edge.weight !== undefined && (
                  <text
                    x={midX}
                    y={midY - 6}
                    textAnchor="middle"
                    fontSize="11"
                    fill={isActive ? "#f59e0b" : "#64748b"}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="500"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {graph.nodes.map((node) => {
            const colors = getNodeColor(node.id, step);
            const isActive = step.current === node.id;
            return (
              <g key={node.id} style={{ transition: "all 0.3s" }}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_RADIUS + (isActive ? 3 : 0)}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isActive ? 3 : 2}
                  filter={isActive ? "url(#glow)" : undefined}
                  style={{ transition: "fill 0.3s, r 0.2s" }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={colors.text}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {node.label}
                </text>
                {step.distances && step.distances[node.id] !== undefined && (
                  <text
                    x={node.x}
                    y={node.y - NODE_RADIUS - 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill={step.distances[node.id] === Infinity ? "#475569" : "#34d399"}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="600"
                  >
                    {step.distances[node.id] === Infinity ? "∞" : step.distances[node.id]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 text-xs">
          {[
            { color: "#f59e0b", label: "Đang xử lý" },
            { color: "#7c3aed", label: "Trong hàng đợi" },
            { color: "#0d9488", label: "Đã thăm" },
            { color: "#1e293b", label: "Chưa thăm" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: color }} />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-3 bg-muted/50 border-t border-border min-h-[52px]">
        <p className="text-sm text-foreground/90 font-mono">{step.description}</p>
      </div>

      {/* Queue/Stack state */}
      {(step.inQueue.length > 0 || step.visited.length > 0) && (
        <div className="px-4 py-2 border-t border-border flex gap-4 text-xs flex-wrap">
          {step.inQueue.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Hàng đợi:</span>
              <div className="flex gap-1">
                {step.inQueue.map((id) => (
                  <span key={id} className="px-1.5 py-0.5 rounded bg-[#7c3aed]/20 text-purple-300 font-mono font-bold">{id}</span>
                ))}
              </div>
            </div>
          )}
          {step.visited.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Đã thăm:</span>
              <div className="flex gap-1 flex-wrap">
                {step.visited.map((id) => (
                  <span key={id} className="px-1.5 py-0.5 rounded bg-teal-900/40 text-teal-300 font-mono font-bold">{id}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="px-4 py-3 border-t border-border flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={goFirst} disabled={stepIdx === 0} className="h-8 w-8">
              <SkipBack className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={prev} disabled={stepIdx === 0} className="h-8 w-8">
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              onClick={() => setPlaying((p) => !p)}
              disabled={stepIdx >= steps.length - 1}
              className="h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/80"
            >
              {playing ? <Pause className="h-3.5 w-3.5 mr-1" /> : <Play className="h-3.5 w-3.5 mr-1" />}
              {playing ? "Dừng" : "Chạy"}
            </Button>
            <Button variant="ghost" size="icon" onClick={next} disabled={stepIdx >= steps.length - 1} className="h-8 w-8">
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goLast} disabled={stepIdx >= steps.length - 1} className="h-8 w-8">
              <SkipForward className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={reset} className="h-8 w-8">
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Bước {stepIdx + 1} / {steps.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-14">Tốc độ {speed}x</span>
          <Slider
            value={[speed]}
            onValueChange={([v]) => setSpeed(v)}
            min={0.5}
            max={3}
            step={0.5}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
