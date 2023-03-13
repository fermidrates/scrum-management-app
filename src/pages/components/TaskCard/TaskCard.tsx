import React from "react";
import { Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import { useDrag } from "react-dnd/dist/hooks";

import { TaskType } from "@/graphQL/schemaType";

import { ItemTypes } from "@/constants/constants";

export type TaskProps = {
  task: TaskType;
};

const TaskCard = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      style={{
        opacity: 2,
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Typography>{task.title}</Typography>
        <Typography variant="subtitle2">{task?.assignee}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
