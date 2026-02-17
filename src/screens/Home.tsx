/**
 * Home screen - Task list with filters
 */

import { Layout } from "@/components/Layout";
import { Filters } from "@/components/Filters";
import { StatsOverview } from "@/components/StatsOverview";
import { TaskCard } from "@/components/TaskCard";
import { useTasks } from "@/modules/tasks/queries";

export default function Home() {
  const { data: tasks, isLoading, error } = useTasks();

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-instrument text-3xl text-foreground">
            Explore Terminal Bench Tasks
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover tasks across Terminal Bench 1, 2, 3, and community contributions
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-72 shrink-0 space-y-6">
            <StatsOverview />
            <Filters />
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Loading state */}
            {isLoading && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="panel-glass animate-pulse rounded-xl p-5"
                  >
                    <div className="mb-3 h-5 w-3/4 rounded bg-muted" />
                    <div className="mb-4 space-y-2">
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-2/3 rounded bg-muted" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-5 w-16 rounded-full bg-muted" />
                      <div className="h-5 w-20 rounded-full bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                <p className="text-destructive">
                  Failed to load tasks. Please try again later.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {error instanceof Error ? error.message : "Unknown error"}
                </p>
              </div>
            )}

            {/* Tasks grid */}
            {tasks && tasks.length > 0 && (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  {tasks.length} task{tasks.length !== 1 && "s"} found
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tasks.map((task) => (
                    <TaskCard key={`${task.benchmark}-${task.id}`} task={task} />
                  ))}
                </div>
              </>
            )}

            {/* Empty state */}
            {tasks && tasks.length === 0 && (
              <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
                <p className="text-lg text-foreground">No tasks found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
