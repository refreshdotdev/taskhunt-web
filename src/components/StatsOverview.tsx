/**
 * Statistics overview component
 */

import { BarChart3, GitPullRequest, Layers } from "lucide-react";
import { useStats } from "@/modules/tasks/queries";

export function StatsOverview() {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="panel-glass rounded-xl p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-16 rounded bg-muted" />
            <div className="h-16 rounded bg-muted" />
            <div className="h-16 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="panel-glass rounded-xl p-5">
      <h2 className="mb-4 text-sm font-medium text-foreground">Overview</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* Total tasks */}
        <div className="rounded-lg bg-primary/5 p-4 text-center">
          <Layers className="mx-auto mb-2 h-5 w-5 text-primary" />
          <div className="text-2xl font-semibold text-foreground">
            {stats.total_tasks}
          </div>
          <div className="text-xs text-muted-foreground">Total Tasks</div>
        </div>

        {/* Benchmarks */}
        <div className="rounded-lg bg-accent/5 p-4 text-center">
          <BarChart3 className="mx-auto mb-2 h-5 w-5 text-accent-foreground" />
          <div className="text-2xl font-semibold text-foreground">
            {stats.benchmarks.length}
          </div>
          <div className="text-xs text-muted-foreground">Benchmarks</div>
        </div>

        {/* PR tasks */}
        <div className="rounded-lg bg-success/5 p-4 text-center">
          <GitPullRequest className="mx-auto mb-2 h-5 w-5 text-success" />
          <div className="text-2xl font-semibold text-foreground">
            {stats.total_pr_tasks}
          </div>
          <div className="text-xs text-muted-foreground">PR Tasks</div>
        </div>
      </div>

      {/* Benchmark breakdown */}
      <div className="mt-4 space-y-2">
        {stats.benchmarks.map((b) => (
          <div
            key={b.benchmark}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-foreground">{b.display_name}</span>
            <span className="text-muted-foreground">{b.total_tasks} tasks</span>
          </div>
        ))}
      </div>
    </div>
  );
}
