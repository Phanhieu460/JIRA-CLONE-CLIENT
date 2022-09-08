import "./App.css";
import Board from "./pages/Board/Board";
import ProjectSettings from "./pages/ProjectSettings/ProjectSettings";
import JiraTemplate from "./components/templates/JiraTemplate";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { withRouter } from "react-router";
import ProjectList from "./pages/ProjectList/ProjectList";
import Account from "./pages/Account/Account";
import ViewDetailIssue from "./pages/Modal/ViewDetailIssue";
import LoginGoogle  from "./pages/Auth/LoginGoogle";


function App() {
  return (

      <Router>
        <Switch>
          <JiraTemplate
            Component={withRouter(Board)}
            exact
            title="Kanban Board"
            path="/project/:id/board"
          />
          <JiraTemplate
            Component={withRouter(ProjectSettings)}
            exact
            title="Project Settings"
            path="/project/:id/project-settings"
          />
          <JiraTemplate
            Component={withRouter(Account)}
            exact
            title="Account"
            path="/account"
          />
          <Route
            path="/login"
            exact
            component={Login}
          />
          <Route
            path="/register"
            exact
            component={Register}
          />
          <Route path="/" exact component={Login}/>
          <Route path="/project" exact component={ProjectList}/>
          <Route path="/project/:id/board/issues/:issueId" exact component={ViewDetailIssue}/>
          <Route path="/google"  component={LoginGoogle}/>

        </Switch>
      </Router>

  );
}

export default App;
