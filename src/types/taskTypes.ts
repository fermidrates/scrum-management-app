import { TaskType } from "@/graphQL/schemaType";

export type TaskInitialValueType = Omit<TaskType, "task_ID">;
