import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useDrop } from "react-dnd";
import { Button, Grid } from "@mui/material";

import TaskContainer from "../TaskContainer/TaskContainer";
import UpsertTaskModal from "../UpsertTaskModal/UpsertTaskModal";

import { GET_TASKS } from "@/graphQL/queries";

import { GetTasksSchema, TaskType } from "@/graphQL/schemaType";

import { ItemTypes } from "@/constants/constants";

const WorkBoard = () => {
  const [backlogTasks, setBacklogTasks] = useState<TaskType[]>();
  const [inProgressTasks, setInProgressTasks] = useState<TaskType[]>();
  const [stagingTasks, setStagingTasks] = useState<TaskType[]>();
  const [toProductionTasks, setToProductionTasks] = useState<TaskType[]>();
  const [productionTasks, setProductionTasks] = useState<TaskType[]>();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const { loading } = useQuery<GetTasksSchema>(GET_TASKS, {
    onCompleted: (res: GetTasksSchema) => {
      res.task.forEach((task: TaskType) => {
        switch (task.progress) {
          case "backlog":
            setBacklogTasks((prevState) =>
              prevState ? [...prevState, task] : [task]
            );
            break;
          case "inProgress":
            setInProgressTasks((prevState) =>
              prevState ? [...prevState, task] : [task]
            );
            break;
          case "staging":
            setStagingTasks((prevState) =>
              prevState ? [...prevState, task] : [task]
            );
            break;
          case "toProduction":
            setToProductionTasks((prevState) =>
              prevState ? [...prevState, task] : [task]
            );
            break;
          default:
            setProductionTasks((prevState) =>
              prevState ? [...prevState, task] : [task]
            );
        }
      });
    },
  });

  const handleUpsertTaskModal = () => {
    setIsAddTaskModalOpen((prevState) => !prevState);
  };

  if (loading) return <>"please wait"</>;
  return (
    <>
      <div style={{ display: "block" }}>
        <Grid
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "8px",
          }}
        >
          <Button
            variant="contained"
            style={{ padding: "8px" }}
            onClick={handleUpsertTaskModal}
          >
            Add task
          </Button>
        </Grid>
        <div style={{ display: "flex", gap: "16px" }}>
          <TaskContainer drop={drop} title="Backlog" tasks={backlogTasks} />
          <TaskContainer
            drop={drop}
            title="In Progress"
            tasks={inProgressTasks}
          />
          <TaskContainer drop={drop} title="Staging" tasks={stagingTasks} />
          <TaskContainer
            drop={drop}
            title="To Production"
            tasks={toProductionTasks}
          />
          <TaskContainer
            drop={drop}
            title="Production"
            tasks={productionTasks}
          />
        </div>
      </div>
      <UpsertTaskModal
        open={isAddTaskModalOpen}
        onClose={handleUpsertTaskModal}
      />
    </>
  );
};

export default WorkBoard;
