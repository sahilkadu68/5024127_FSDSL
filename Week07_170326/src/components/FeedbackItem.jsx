import React from "react";
function FeedbackItem({ feedback }) {
  return (
    <div className="card">
      <h3>{feedback.name}</h3>
      <p>Rating: {feedback.rating} ⭐</p>
      <p>{feedback.message}</p>
    </div>
  );
}
export default FeedbackItem;