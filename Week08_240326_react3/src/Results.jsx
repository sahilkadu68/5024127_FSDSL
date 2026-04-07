import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  // 🛣️ ROUTER: useLocation pulls state passed from Quiz via navigate()
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    // Guard: if someone lands here directly, redirect home
    navigate("/");
    return null;
  }

  const { answers, questions } = state;
  const score = answers.filter((a) => a.correct).length;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  const emoji = pct === 100 ? "🏆" : pct >= 60 ? "👍" : "📚";
  const label = pct === 100 ? "Perfect!" : pct >= 60 ? "Good job!" : "Keep practicing!";

  return (
    <div className="page results-page">
      <div className="results-card">
        <div className="score-circle">
          <span className="score-emoji">{emoji}</span>
          <span className="score-num">{score}/{total}</span>
          <span className="score-pct">{pct}%</span>
        </div>
        <h2>{label}</h2>

        {/* Breakdown — 🔑 KEY on each row using questionId */}
        <ul className="breakdown">
          {answers.map((a, i) => {
            const q = questions.find((q) => q.id === a.questionId);
            return (
              // 🔑 KEY: stable questionId as key
              <li key={a.questionId} className={`breakdown-row ${a.correct ? "correct" : "wrong"}`}>
                <span className="row-num">Q{i + 1}</span>
                <span className="row-q">{q.question.slice(0, 48)}…</span>
                <span className="row-icon">{a.correct ? "✓" : "✗"}</span>
              </li>
            );
          })}
        </ul>

        <button className="btn-primary" onClick={() => navigate("/")}>
          ← Play Again
        </button>
      </div>
    </div>
  );
}