/**
 * Task card component for grid/list views
 */

import { GitPullRequest, User } from "lucide-react";
import { Link } from "react-router-dom";
import type { TaskListItem } from "@/lib/api";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: TaskListItem;
}

function getDifficultyClass(difficulty: string | null): string {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "difficulty-easy";
    case "medium":
      return "difficulty-medium";
    case "hard":
      return "difficulty-hard";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Link
      to={`/task/${task.benchmark}/${task.id}`}
      className="group block no-underline"
    >
      <div
        className={cn(
          "panel-glass rounded-xl p-5 transition-all duration-200",
          "hover:shadow-lg hover:border-primary/20",
          "card-hover"
        )}
      >
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-medium text-foreground group-hover:text-primary">
              {task.id}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {task.benchmark_display_name}
            </p>
          </div>

          {/* PR badge */}
          {task.is_from_pr && (
            <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs text-accent-foreground">
              <GitPullRequest className="h-3 w-3" />
              PR #{task.pr_number}
            </span>
          )}
        </div>

        {/* Instruction preview */}
        <p className="mb-4 line-clamp-2 text-sm text-foreground-muted">
          {task.instruction_preview}
        </p>

        {/* Footer */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty badge */}
          {task.difficulty && (
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                getDifficultyClass(task.difficulty)
              )}
            >
              {task.difficulty}
            </span>
          )}

          {/* Category badge */}
          {task.category && (
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
              {task.category}
            </span>
          )}

          {/* Author */}
          {task.author_name && (
            <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              {task.author_name}
            </span>
          )}
        </div>

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {task.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{task.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
