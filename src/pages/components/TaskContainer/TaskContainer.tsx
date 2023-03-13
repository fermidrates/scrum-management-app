import React from "react";
import { Box, Typography } from "@mui/material";

import TaskCard from "../TaskCard/TaskCard";

import { TaskType } from "@/graphQL/schemaType";

export type TaskContainerProps = {
  drop: any;
  title: string;
  tasks?: TaskType[];
};

const TaskContainer = ({ drop, title, tasks }: TaskContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "260px",
        height: "600px",
        backgroundColor: "grey",
        p: 2,
        gap: "8px",
      }}
      ref={drop}
    >
      <Typography>{title}</Typography>
      {tasks?.map((task: TaskType) => {
        return <TaskCard task={task} />;
      })}
    </Box>
  );
};

export default TaskContainer;
