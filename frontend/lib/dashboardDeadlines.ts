import { Deadline } from "@/types/deadline";
import { apiFetch } from "./auth-context";

export async function fetchDeadlines(): Promise<Deadline[]> {
  return apiFetch("/deadlines");
}