import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_TASKS } from "@/graphQL/queries";
import { GetTasksSchema } from "@/graphQL/schemaType";

const WorkBoard = () => {
  const [tasks, setTasks] = useState<any>();
  const [backlogTasks, setBacklogTasks] = useState<any>([]);
  const [inProgressTasks, setInProgressTasks] = useState<any>([]);
  const [stagingTasks, setStagingTasks] = useState<any>([]);
  const [toProductionTasks, setToProductionTasks] = useState<any>([]);
  const [productionTasks, setProductionTasks] = useState<any>([]);

  const { loading } = useQuery<GetTasksSchema>(GET_TASKS, {
    onCompleted: (res: GetTasksSchema) => {
      setTasks(res.task);
      res.task.forEach((task: any) => {
        switch (task.progress) {
          case "backlog":
            setBacklogTasks([...backlogTasks, task]);
            break;
          case "inProgress":
            setInProgressTasks([...inProgressTasks, task]);
            break;
          case "staging":
            setStagingTasks([...stagingTasks, task]);
            break;
          case "toProduction":
            setToProductionTasks([...toProductionTasks, task]);
            break;
          default:
            setProductionTasks([...productionTasks, task]);
        }
      });
    },
  });

  if (loading) return <>"please wait"</>;
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <div style={{ display: "block" }}>
        Backlog
        {backlogTasks.map((task: any) => {
          return <div key={task.task_ID}>{task.title}</div>;
        })}
      </div>
      <div style={{ display: "block" }}>
        In Progress
        {inProgressTasks.map((task: any) => {
          return <div key={task.task_ID}>{task.title}</div>;
        })}
      </div>
      <div style={{ display: "block" }}>
        Staging
        {stagingTasks.map((task: any) => {
          return <div key={task.task_ID}>{task.title}</div>;
        })}
      </div>
      <div style={{ display: "block" }}>
        To Production
        {toProductionTasks.map((task: any) => {
          return <div key={task.task_ID}>{task.title}</div>;
        })}
      </div>
      <div style={{ display: "block" }}>
        Production
        {productionTasks.map((task: any) => {
          return <div key={task.task_ID}>{task.title}</div>;
        })}
      </div>
    </div>
  );
};

export default WorkBoard;
