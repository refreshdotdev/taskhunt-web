/**
 * API client for TaskHunt.ai backend
 */

const API_BASE = import.meta.env.VITE_API_URL || "";

export interface TaskListItem {
  id: string;
  benchmark: string;
  benchmark_display_name: string;
  instruction_preview: string;
  difficulty: string | null;
  category: string | null;
  tags: string[];
  author_name: string | null;
  is_from_pr: boolean;
  pr_number: number | null;
}

export interface TaskMetadata {
  author_name: string | null;
  author_email: string | null;
  difficulty: string | null;
  category: string | null;
  tags: string[];
  expert_time_estimate_min: number | null;
  junior_time_estimate_min: number | null;
}

export interface EnvironmentConfig {
  docker_image: string | null;
  cpus: number | null;
  memory: string | null;
  storage: string | null;
  build_timeout_sec: number | null;
}

export interface PRInfo {
  number: number;
  title: string;
  url: string;
  author: string;
  state: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Task {
  id: string;
  benchmark: string;
  benchmark_display_name: string;
  instruction: string;
  metadata: TaskMetadata;
  environment: EnvironmentConfig | null;
  agent_timeout_sec: number | null;
  verifier_timeout_sec: number | null;
  github_url: string | null;
  pr_info: PRInfo | null;
}

export interface BenchmarkStats {
  benchmark: string;
  display_name: string;
  total_tasks: number;
  by_difficulty: Record<string, number>;
  by_category: Record<string, number>;
}

export interface OverallStats {
  total_tasks: number;
  total_pr_tasks: number;
  benchmarks: BenchmarkStats[];
  difficulties: string[];
  categories: string[];
}

export interface TaskFilters {
  benchmark?: string;
  difficulty?: string;
  category?: string;
  search?: string;
  include_prs?: boolean;
  limit?: number;
  offset?: number;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchTasks(filters: TaskFilters = {}): Promise<TaskListItem[]> {
  const params = new URLSearchParams();

  if (filters.benchmark) params.set("benchmark", filters.benchmark);
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.category) params.set("category", filters.category);
  if (filters.search) params.set("search", filters.search);
  if (filters.include_prs !== undefined) params.set("include_prs", String(filters.include_prs));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.offset) params.set("offset", String(filters.offset));

  const query = params.toString();
  return fetchApi<TaskListItem[]>(`/api/tasks${query ? `?${query}` : ""}`);
}

export async function fetchTask(benchmark: string, taskId: string): Promise<Task> {
  return fetchApi<Task>(`/api/tasks/${benchmark}/${taskId}`);
}

export async function searchTasks(query: string, limit = 50): Promise<TaskListItem[]> {
  return fetchApi<TaskListItem[]>(`/api/tasks/search?q=${encodeURIComponent(query)}&limit=${limit}`);
}

export async function fetchStats(): Promise<OverallStats> {
  return fetchApi<OverallStats>("/api/stats");
}

export async function fetchPRTasks(benchmark?: string): Promise<TaskListItem[]> {
  const params = new URLSearchParams();
  if (benchmark) params.set("benchmark", benchmark);

  const query = params.toString();
  return fetchApi<TaskListItem[]>(`/api/tasks/pr${query ? `?${query}` : ""}`);
}
