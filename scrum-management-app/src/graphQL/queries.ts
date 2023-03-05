import {gql} from "@apollo/client";

export const GET_TASKS = gql`
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

export const GET_USER_BY_USERNAME = gql`
  query getUser($username: String!) {
    user_aggregate(where: { username: { _eq: $username } }) {
      nodes {
        user_ID
        username
        role
        squad
      }
    }
  }
`