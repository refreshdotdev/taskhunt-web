/**
 * Filter controls for task list
 */

import { useAtom } from "jotai";
import {
  benchmarkFilterAtom,
  categoryFilterAtom,
  difficultyFilterAtom,
  includePRsAtom,
} from "@/store/atoms";
import { useStats } from "@/modules/tasks/queries";
import { cn } from "@/lib/utils";

export function Filters() {
  const { data: stats } = useStats();
  const [benchmark, setBenchmark] = useAtom(benchmarkFilterAtom);
  const [difficulty, setDifficulty] = useAtom(difficultyFilterAtom);
  const [category, setCategory] = useAtom(categoryFilterAtom);
  const [includePRs, setIncludePRs] = useAtom(includePRsAtom);

  return (
    <div className="panel-glass rounded-xl p-5">
      <h2 className="mb-4 text-sm font-medium text-foreground">Filters</h2>

      <div className="space-y-4">
        {/* Benchmark filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Benchmark
          </label>
          <select
            value={benchmark || ""}
            onChange={(e) => setBenchmark(e.target.value || null)}
            className={cn(
              "w-full rounded-lg border border-border bg-background px-3 py-2",
              "text-sm text-foreground",
              "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            )}
          >
            <option value="">All Benchmarks</option>
            {stats?.benchmarks.map((b) => (
              <option key={b.benchmark} value={b.benchmark}>
                {b.display_name} ({b.total_tasks})
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Difficulty
          </label>
          <select
            value={difficulty || ""}
            onChange={(e) => setDifficulty(e.target.value || null)}
            className={cn(
              "w-full rounded-lg border border-border bg-background px-3 py-2",
              "text-sm text-foreground",
              "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            )}
          >
            <option value="">All Difficulties</option>
            {stats?.difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Category
          </label>
          <select
            value={category || ""}
            onChange={(e) => setCategory(e.target.value || null)}
            className={cn(
              "w-full rounded-lg border border-border bg-background px-3 py-2",
              "text-sm text-foreground",
              "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            )}
          >
            <option value="">All Categories</option>
            {stats?.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Include PRs toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="include-prs"
            checked={includePRs}
            onChange={(e) => setIncludePRs(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label
            htmlFor="include-prs"
            className="text-sm text-foreground"
          >
            Include PR tasks
          </label>
        </div>

        {/* Clear filters */}
        {(benchmark || difficulty || category) && (
          <button
            onClick={() => {
              setBenchmark(null);
              setDifficulty(null);
              setCategory(null);
            }}
            className="w-full rounded-lg border border-border py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
