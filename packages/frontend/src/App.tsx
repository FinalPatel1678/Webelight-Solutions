import Loader from "./components/Loader/Loader";
import { MainNavigation } from "./components/MainNavigation";
import { NotificationWrapper } from "./components/NotificationWrapper";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <NotificationWrapper>
      <Loader>
        <Router>
          <MainNavigation />
        </Router>
      </Loader>
    </NotificationWrapper>
  );
};

export default App;
