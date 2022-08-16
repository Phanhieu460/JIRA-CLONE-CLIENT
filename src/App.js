import './App.css';
import Board from './pages/Board/Board';
import ProjectSettings from './pages/ProjectSettings/ProjectSettings';
import JiraTemplate from './components/templates/JiraTemplate';
import {BrowserRouter as Router, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <JiraTemplate
          Component={Board}
          exact
          title="Kanban Board"
          path="/board"
        />
        <JiraTemplate
          Component={ProjectSettings}
          exact
          title="Project Settings"
          path="/project-settings"
        />
      </Switch>
    </Router>
  );
}

export default App;
