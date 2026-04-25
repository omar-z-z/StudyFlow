import { ProgressData } from "@/types/progress";
import { apiFetch } from "./api";

export async function fetchProgress(): Promise<ProgressData> {
  return apiFetch("/progress");
}