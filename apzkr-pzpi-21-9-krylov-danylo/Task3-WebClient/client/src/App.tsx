import React, { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ContextMenuContext, UserSessionContext } from ".";
import { AppRouter } from "./components/AppRouter/AppRouter";
import { Navbar } from "./components/Navbar/Navbar";
import { ContextMenu } from "./components/UI/ContextMenu/ContextMenu";
import { useContextMenu } from "./hooks/useContextMenu";
import { useDiagram } from "./hooks/useDiagram";
import { useUserAuthorization } from "./hooks/useUserAuthorization";
import "./styles/App.css";

export const App = () => {
  const userSessionValue = useUserAuthorization();
  const contextMenuValue = useContextMenu();

  return (
    <ContextMenuContext.Provider value={contextMenuValue}>
      <UserSessionContext.Provider value={userSessionValue}>
          <BrowserRouter>
            <Navbar>
              <AppRouter />
            </Navbar>
          </BrowserRouter>
      </UserSessionContext.Provider>
    </ContextMenuContext.Provider>
  );
};
