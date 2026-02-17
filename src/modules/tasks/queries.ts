/**
 * React Query hooks for tasks data
 */

import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import {
  fetchStats,
  fetchTask,
  fetchTasks,
  searchTasks,
  type TaskFilters,
} from "@/lib/api";
import {
  benchmarkFilterAtom,
  categoryFilterAtom,
  difficultyFilterAtom,
  includePRsAtom,
  searchQueryAtom,
} from "@/store/atoms";

export function useTasks(additionalFilters?: TaskFilters) {
  const benchmark = useAtomValue(benchmarkFilterAtom);
  const difficulty = useAtomValue(difficultyFilterAtom);
  const category = useAtomValue(categoryFilterAtom);
  const search = useAtomValue(searchQueryAtom);
  const includePRs = useAtomValue(includePRsAtom);

  const filters: TaskFilters = {
    benchmark: benchmark || undefined,
    difficulty: difficulty || undefined,
    category: category || undefined,
    search: search || undefined,
    include_prs: includePRs,
    ...additionalFilters,
  };

  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => fetchTasks(filters),
  });
}

export function useTask(benchmark: string | undefined, taskId: string | undefined) {
  return useQuery({
    queryKey: ["task", benchmark, taskId],
    queryFn: () => fetchTask(benchmark!, taskId!),
    enabled: !!benchmark && !!taskId,
  });
}

export function useSearchTasks(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchTasks(query),
    enabled: query.length >= 2,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });
}
