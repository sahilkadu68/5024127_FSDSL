import { useState } from "react";

function IssueForm({ onSubmitIssue }) {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function getDepartment(issueType) {
    if (issueType.includes("Water")) return "Water Department";
    if (issueType.includes("Electricity") || issueType.includes("Streetlight")) return "Electricity Department";
    if (issueType.includes("Garbage") || issueType.includes("Toilet")) return "Sanitation Department";
    return "Public Works Department";
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!type || !location || !description) {
      setError("Please fill all required fields.");
      return;
    }

    if (description.length < 10) {
      setError("Description must be at least 10 characters.");
      return;
    }

    const issue = {
      id: Date.now(),
      type,
      location,
      priority,
      description,
      department: getDepartment(type),
      status: "Pending",
      date: new Date().toLocaleString()
    };

    onSubmitIssue(issue);

    // Reset form
    setType("");
    setLocation("");
    setPriority("Medium");
    setDescription("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Report an Issue</h3>

      {error && <p className="error">{error}</p>}

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Issue Category</option>

        <optgroup label="Infrastructure">
          <option>Road Damage / Potholes</option>
          <option>Broken Footpath</option>
          <option>Drainage Issue</option>
        </optgroup>

        <optgroup label="Utilities">
          <option>Streetlight Not Working</option>
          <option>Water Supply Issue</option>
          <option>Electricity Problem</option>
        </optgroup>

        <optgroup label="Sanitation">
          <option>Garbage Not Collected</option>
          <option>Overflowing Dustbins</option>
          <option>Public Toilet Maintenance</option>
        </optgroup>

        <optgroup label="Public Safety">
          <option>Traffic Signal Not Working</option>
          <option>Open Manhole</option>
          <option>Illegal Construction</option>
        </optgroup>
      </select>

      <input
        type="text"
        placeholder="Location / Area"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <textarea
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Submit Report</button>
    </form>
  );
}
export default IssueForm;