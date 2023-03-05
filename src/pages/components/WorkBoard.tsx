import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { GET_TASKS } from "@/graphQL/queries";

const WorkBoard = () => {
  const [tasks, setTasks] = useState<any>();

  const { loading } = useQuery<any>(GET_TASKS, {
    onCompleted: (res) => {
      setTasks(res.task);
    },
  });

  if (loading) return <>"please wait"</>;
  return (
    <div>
      {tasks.map((task: any) => {
        return <div key={task.task_ID}>{task.title}</div>;
      })}
    </div>
  );
};

export default WorkBoard;
