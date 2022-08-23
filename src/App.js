import "./App.css";
import Board from "./pages/Board/Board";
import ProjectSettings from "./pages/ProjectSettings/ProjectSettings";
import JiraTemplate from "./components/templates/JiraTemplate";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import Auth from "./views/Auth";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <JiraTemplate
            Component={withRouter(Board)}
            exact
            title="Kanban Board"
            path="/board"
          />
          <JiraTemplate
            Component={withRouter(ProjectSettings)}
            exact
            title="Project Settings"
            path="/project-settings"
          />
          <Route
            path="/login"
            exact
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            path="/register"
            exact
            render={(props) => <Auth {...props} authRoute="register" />}
          />
          <Route path="/" exact render={(props) => <Auth {...props} authRoute="login" />}/>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
