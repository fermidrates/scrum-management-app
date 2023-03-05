import {ApolloClient, InMemoryCache} from "@apollo/client";

const HASURA_ADMIN_SECRET = "dL8ydqum3ZARSuYiV0PrJX9fxMgBZ8tTk7zqtZyqMFRhM2slMnjlXdECbYHVQZJK";

export const client = new ApolloClient({
  uri: "https://legal-trout-79.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      HASURA_ADMIN_SECRET,
  },
  cache: new InMemoryCache(),
});