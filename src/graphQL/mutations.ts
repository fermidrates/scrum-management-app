import  {gql} from "@apollo/client";

export const INSERT_USER = gql`
  mutation insertUser($username: String!, $role: String!, $squad: String) {
    insert_user_one(
      object: { username: $username, role: $role, squad: $squad }
    ) {
      __typename
    }
  }
`;