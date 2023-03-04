import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_TASKS = gql`
  query getTasks {
    task {
      task_ID
      title
      description
      assignee
      progress
    }
  }
`;

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
