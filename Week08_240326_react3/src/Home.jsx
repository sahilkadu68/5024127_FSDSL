import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="page home-page">
      <div className="home-card">
        <span className="badge">General Knowledge Quiz</span>
        <h1>Test Your<br /><em>General</em> Knowledge</h1>
        <p>5 questions · Timed · Instant results</p>
        <div className="topics">
          {["Science", "Geography", "History", "Art"].map((t) => (
            // 🔑 KEY: stable unique key on each rendered badge
            <span key={t} className="topic-tag">{t}</span>
          ))}
        </div>
        <button className="btn-primary" onClick={() => navigate("/quiz")}>
          Start Quiz →
        </button>
      </div>
    </div>
  );
}