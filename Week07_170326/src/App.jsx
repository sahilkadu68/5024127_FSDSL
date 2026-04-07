import React, { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import "./App.css";

function App() {

  const [feedbacks, setFeedbacks] = useState([]);

  const addFeedback = (feedback) => {
    setFeedbacks([...feedbacks, feedback]);
  };

  return (
    <div className="container">

      <h1>Customer Feedback System</h1>

      <FeedbackForm addFeedback={addFeedback} />

      <FeedbackList feedbacks={feedbacks} />

    </div>
  );
}

export default App;