export type Step = 0 | 1 | 2;

export type BasicForm = {
  name: string;
  examDate: string;
  color: string;
};

export type BasicErrors = Partial<Record<keyof BasicForm, string>>;

export type TopicDraft = {
  id: string;
  title: string;
  week: string;
};

export type AssignmentDraft = {
  id: string;
  title: string;
  dueDate: string;
};