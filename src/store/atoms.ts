/**
 * Jotai atoms for TaskHunt.ai state management
 */

import { atom } from "jotai";

// Filter state
export const benchmarkFilterAtom = atom<string | null>(null);
export const difficultyFilterAtom = atom<string | null>(null);
export const categoryFilterAtom = atom<string | null>(null);
export const searchQueryAtom = atom<string>("");
export const includePRsAtom = atom<boolean>(true);

// UI state
export const selectedTaskIdAtom = atom<string | null>(null);
export const viewModeAtom = atom<"grid" | "list">("grid");
