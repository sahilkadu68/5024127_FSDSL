import { useState } from "react";
import IssueForm from "./components/IssueForm";
import IssueList from "./components/IssueList";
import "./App.css";

function App() {
  const [issues, setIssues] = useState([]);

  function addIssue(issue) {
    setIssues(prev => [...prev, issue]);
  }

  // ✅ RETURN MUST BE INSIDE FUNCTION
  return (
    <div className="container">
      <header>
        <h1>Civic Issue Reporter</h1>
        <p>Empowering citizens to improve their community.</p>
      </header>

      <div className="dashboard">
        <div className="left-panel">
          <IssueForm onSubmitIssue={addIssue} />
        </div>

        <div className="right-panel">
          <IssueList issues={issues} />
        </div>
      </div>
    </div>
  );
}

export default App;