import React from "react";
import FeedbackItem from "./FeedbackItem";
function FeedbackList({ feedbacks }) {
  return (
    <div className="feedback-list">
      {feedbacks.length === 0 && <p>No feedback yet</p>}
      {feedbacks.map((fb, index) => (
        <FeedbackItem key={index} feedback={fb} />
      ))}
    </div>
  );
}
export default FeedbackList;