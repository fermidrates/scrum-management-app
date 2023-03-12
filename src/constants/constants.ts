import { TaskType } from "@/graphQL/schemaType";
import { SelectType, UserContextType } from "@/types/contextTypes";

export const ItemTypes = {
  TASK: "task",
};

export const USER_CONTEXT_INITIAL_VALUE: UserContextType = {
  username: "",
  role: "",
  squad: "",
};

export const TASK_INITIAL_VALUE: Omit<TaskType, "task_ID"> = {
  title: "",
  description: "",
  assignee: "",
  progress: "backlog",
};

export const TASK_PROGRESS: SelectType[] = [
  {
    label: "Backlog",
    value: "backlog",
  },
  {
    label: "In Progress",
    value: "inProgress",
  },
  {
    label: "Staging",
    value: "staging",
  },
  {
    label: "To Production",
    value: "toProduction",
  },
  {
    label: "Production",
    value: "production",
  },
];
