import './App.css';
import Board from './pages/Board/Board';
import ProjectSettings from './pages/ProjectSettings/ProjectSettings';
import JiraTemplate from './components/templates/JiraTemplate';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import {withRouter} from 'react-router';

function App() {
  return (
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
        <Route path="/login" exact component={withRouter(Login)}/>
        <Route path="/register" exact component={withRouter(Register)}/>
        <Route path="/" exact component={withRouter(Login)}/>
      </Switch>
    </Router>
  );
}

export default App;
