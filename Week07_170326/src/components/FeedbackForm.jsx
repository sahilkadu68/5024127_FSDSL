import React, { useState } from "react";

function FeedbackForm({ addFeedback }) {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      name,
      message,
      rating
    };

    addFeedback(newFeedback);

    setName("");
    setMessage("");
    setRating(5);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Write your feedback"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        required
      />

      <select
        value={rating}
        onChange={(e)=>setRating(e.target.value)}
      >
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>

      <button type="submit">Submit Feedback</button>

    </form>
  );
}

export default FeedbackForm;