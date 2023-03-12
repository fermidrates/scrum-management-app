import { gql } from "@apollo/client";

export const INSERT_USER = gql`
  mutation insertUser($username: String!, $role: String!, $squad: String) {
    insert_user_one(
      object: { username: $username, role: $role, squad: $squad }
    ) {
      __typename
    }
  }
`;

export const INSERT_TASK = gql`
  mutation insertTask(
    $title: String!
    $description: String
    $assignee: String
    $progress: String
  ) {
    insert_task_one(
      object: {
        title: $title
        description: $description
        assignee: $assignee
        progress: $progress
      }
    ) {
      __typename
    }
  }
`;
