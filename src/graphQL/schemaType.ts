/// Type ///

export type ProgressType =
  | "backlog"
  | "inProgress"
  | "staging"
  | "toProduction"
  | "production";

export type RoleType = "backend" | "frontend" | "qa" | "product";

export type TaskType = {
  task_ID: string;
  title: string;
  description?: string;
  assignee?: string;
  progress: ProgressType;
};

export type UserType = {
  user_ID: string;
  username: string;
  role: RoleType;
  squad: string;
};

/// Query Schema ///

export type GetTasksSchema = {
  task: Array<TaskType>;
};

export type GetUserByUsernameSchema = {
  user_aggregate: {
    nodes: UserType[];
  };
};
