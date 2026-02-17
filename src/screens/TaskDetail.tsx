/**
 * Task detail screen
 */

import {
  ArrowLeft,
  Clock,
  Container,
  ExternalLink,
  GitPullRequest,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Layout } from "@/components/Layout";
import { useTask } from "@/modules/tasks/queries";
import { cn } from "@/lib/utils";

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

export default function TaskDetail() {
  const { benchmark, taskId } = useParams<{
    benchmark: string;
    taskId: string;
  }>();
  const { data: task, isLoading, error } = useTask(benchmark, taskId);

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Back link */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tasks
        </Link>

        {/* Loading state */}
        {isLoading && (
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-2/3 rounded bg-muted" />
            <div className="h-4 w-1/3 rounded bg-muted" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <p className="text-destructive">Failed to load task.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        )}

        {/* Task content */}
        {task && (
          <div className="flex gap-8">
            {/* Main content */}
            <div className="min-w-0 flex-1">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <h1 className="font-instrument text-3xl text-foreground">
                    {task.id}
                  </h1>
                  {task.pr_info && (
                    <a
                      href={task.pr_info.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent-foreground transition-colors hover:bg-accent/20"
                    >
                      <GitPullRequest className="h-4 w-4" />
                      PR #{task.pr_info.number}
                    </a>
                  )}
                </div>
                <p className="mt-2 text-muted-foreground">
                  {task.benchmark_display_name}
                </p>
              </div>

              {/* Instruction */}
              <div className="panel-glass rounded-xl p-6">
                <h2 className="mb-4 text-lg font-medium text-foreground">
                  Instruction
                </h2>
                <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground-muted prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted">
                  <ReactMarkdown>{task.instruction}</ReactMarkdown>
                </div>
              </div>

              {/* GitHub link */}
              {task.github_url && (
                <div className="mt-6">
                  <a
                    href={task.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on GitHub
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-72 shrink-0 space-y-6">
              {/* Metadata card */}
              <div className="panel-glass rounded-xl p-5">
                <h3 className="mb-4 text-sm font-medium text-foreground">
                  Details
                </h3>

                <div className="space-y-4">
                  {/* Difficulty */}
                  {task.metadata.difficulty && (
                    <div>
                      <div className="mb-1 text-xs text-muted-foreground">
                        Difficulty
                      </div>
                      <span
                        className={cn(
                          "inline-block rounded-full px-3 py-1 text-sm font-medium capitalize",
                          getDifficultyClass(task.metadata.difficulty)
                        )}
                      >
                        {task.metadata.difficulty}
                      </span>
                    </div>
                  )}

                  {/* Category */}
                  {task.metadata.category && (
                    <div>
                      <div className="mb-1 text-xs text-muted-foreground">
                        Category
                      </div>
                      <span className="inline-block rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                        {task.metadata.category}
                      </span>
                    </div>
                  )}

                  {/* Author */}
                  {task.metadata.author_name && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {task.metadata.author_name}
                      </span>
                    </div>
                  )}

                  {/* Time estimates */}
                  {(task.metadata.expert_time_estimate_min ||
                    task.metadata.junior_time_estimate_min) && (
                    <div className="border-t border-border pt-4">
                      <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Time Estimates
                      </div>
                      {task.metadata.expert_time_estimate_min && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expert</span>
                          <span className="text-foreground">
                            {task.metadata.expert_time_estimate_min} min
                          </span>
                        </div>
                      )}
                      {task.metadata.junior_time_estimate_min && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Junior</span>
                          <span className="text-foreground">
                            {task.metadata.junior_time_estimate_min} min
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {task.metadata.tags.length > 0 && (
                    <div className="border-t border-border pt-4">
                      <div className="mb-2 text-xs text-muted-foreground">
                        Tags
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {task.metadata.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Environment card */}
              {task.environment && (
                <div className="panel-glass rounded-xl p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Container className="h-4 w-4" />
                    Environment
                  </h3>

                  <div className="space-y-2 text-sm">
                    {task.environment.docker_image && (
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Docker Image
                        </div>
                        <div className="font-mono text-xs text-foreground break-all">
                          {task.environment.docker_image}
                        </div>
                      </div>
                    )}
                    {task.environment.cpus && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CPUs</span>
                        <span className="text-foreground">
                          {task.environment.cpus}
                        </span>
                      </div>
                    )}
                    {task.environment.memory && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Memory</span>
                        <span className="text-foreground">
                          {task.environment.memory}
                        </span>
                      </div>
                    )}
                    {task.environment.storage && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Storage</span>
                        <span className="text-foreground">
                          {task.environment.storage}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PR info card */}
              {task.pr_info && (
                <div className="panel-glass rounded-xl p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
                    <GitPullRequest className="h-4 w-4" />
                    Pull Request
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">
                      {task.pr_info.title}
                    </div>
                    <div className="text-muted-foreground">
                      by {task.pr_info.author}
                    </div>
                    <a
                      href={task.pr_info.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      View PR
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}
