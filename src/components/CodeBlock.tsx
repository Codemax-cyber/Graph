interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="rounded-lg bg-[#0b1120] border border-border p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300 whitespace-pre">
      {code}
    </pre>
  );
}

interface ComplexityBadgeProps {
  time: string;
  space: string;
}

export function ComplexityBadge({ time, space }: ComplexityBadgeProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-teal-900/30 border border-teal-700/40">
        <span className="text-xs text-muted-foreground">Thời gian</span>
        <span className="font-mono text-sm font-bold text-teal-400">{time}</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-violet-900/30 border border-violet-700/40">
        <span className="text-xs text-muted-foreground">Không gian</span>
        <span className="font-mono text-sm font-bold text-violet-400">{space}</span>
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-foreground mb-3">{title}</h3>
      {children}
    </div>
  );
}
