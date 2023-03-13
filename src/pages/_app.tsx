import { useState } from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { client } from "@/graphqlConfigs";
import UserContext from "@/contexts/UserContext";

import { USER_CONTEXT_INITIAL_VALUE } from "@/constants/constants";
import { UserContextType } from "@/types/contextTypes";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserContextType>(USER_CONTEXT_INITIAL_VALUE);

  return (
    <DndProvider backend={HTML5Backend}>
      <ApolloProvider client={client}>
        <UserContext.Provider value={{ user, setUser }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ApolloProvider>
    </DndProvider>
  );
}
