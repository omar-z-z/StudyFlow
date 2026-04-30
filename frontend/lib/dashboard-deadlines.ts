import { Deadline } from "@/types/deadline";
import { apiFetch } from "./api";

export async function fetchDeadlines(): Promise<Deadline[]> {
  return apiFetch("/deadlines");
}