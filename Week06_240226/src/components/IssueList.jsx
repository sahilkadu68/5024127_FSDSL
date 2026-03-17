function IssueList({ issues }) {
  if (issues.length === 0) {
    return (
      <div className="empty">
        <p>No issues reported yet.</p>
        <small>Your submissions will appear here.</small>
      </div>
    );
  }

  return (
    <div className="issue-list">
      <h3>Reported Issues</h3>

      {issues.map(issue => (
        <div key={issue.id} className={`issue-card priority-${issue.priority.toLowerCase()}`}>
          <div className="issue-header">
            <strong>{issue.type}</strong>
            <span className="status">{issue.status}</span>
          </div>

          <p><b>Location:</b> {issue.location}</p>
          <p>{issue.description}</p>

          <div className="issue-footer">
            <small><b>Dept:</b> {issue.department}</small>
            <small>{issue.date}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IssueList;