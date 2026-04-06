import { Assignment } from "./assignment";
import { Topic } from "./topic";

export interface Course {
  id: string;
  name: string;
  color: string;
  progress: number;
  topics: Topic[];
  assignments: Assignment[];
  examDate?: string;
}