import { ProgressData } from "@/types/progress";
import { apiFetch } from "./auth-context";

export async function fetchProgress(): Promise<ProgressData> {
  return apiFetch("/progress");
}