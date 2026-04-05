export interface Deadline {
  id: number;
  title: string;
  date: string;
  urgency: "urgent" | "normal";
}

export const urgencyStyles: Record<Deadline["urgency"], string> = {
  urgent: "text-orange-500",
  normal: "text-muted-foreground",
};