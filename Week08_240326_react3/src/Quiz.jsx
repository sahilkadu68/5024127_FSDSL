import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ── Questions data ────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "q1",
    question: "Which planet is the largest in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    answer: "Jupiter",
  },
  {
    id: "q2",
    question: "How many bones are in the adult human body?",
    options: ["206", "185", "234", "198"],
    answer: "206",
  },
  {
    id: "q3",
    question: "Which country is home to the Great Barrier Reef?",
    options: ["Brazil", "Philippines", "Australia", "Indonesia"],
    answer: "Australia",
  },
  {
    id: "q4",
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Caravaggio"],
    answer: "Leonardo da Vinci",
  },
  {
    id: "q5",
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: "Au",
  },
];

const TIME_PER_QUESTION = 15;

// ── Custom Hook: useQuiz ──────────────────────────────────────────
// 🪝 HOOK: encapsulates all quiz state logic in a reusable custom hook
function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);       // 🪝 useState
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [locked, setLocked] = useState(false);

  // 🔖 REF: holds the interval ID — changing it won't trigger re-render
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  const goNext = useCallback(
    (chosenAnswer) => {
      stopTimer();
      const q = QUESTIONS[currentIndex];
      const isCorrect = chosenAnswer === q.answer;

      const updatedAnswers = [
        ...answers,
        { questionId: q.id, chosen: chosenAnswer, correct: isCorrect },
      ];
      setAnswers(updatedAnswers);

      if (currentIndex + 1 < QUESTIONS.length) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
        setLocked(false);
        setTimeLeft(TIME_PER_QUESTION);
      } else {
        // Quiz done — navigate to results with state
        navigate("/results", { state: { answers: updatedAnswers, questions: QUESTIONS } });
      }
    },
    [currentIndex, answers, stopTimer, navigate]
  );

  // 🪝 useEffect: starts/restarts the countdown whenever the question changes
  useEffect(() => {
    setTimeLeft(TIME_PER_QUESTION);
    timerRef.current = setInterval(() => {         // 🔖 REF used to store interval
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          goNext(null); // time's up — no answer
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // cleanup on unmount / re-run
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (option) => {
    if (locked) return;
    setSelected(option);
    setLocked(true);
    setTimeout(() => goNext(option), 600);
  };

  return {
    question: QUESTIONS[currentIndex],
    currentIndex,
    total: QUESTIONS.length,
    selected,
    locked,
    timeLeft,
    handleSelect,
  };
}

// ── Quiz Component ────────────────────────────────────────────────
export default function Quiz() {
  const { question, currentIndex, total, selected, locked, timeLeft, handleSelect } = useQuiz();

  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor = timeLeft > 8 ? "#4ade80" : timeLeft > 4 ? "#facc15" : "#f87171";

  return (
    <div className="page quiz-page">
      <div className="quiz-card">
        {/* Header */}
        <div className="quiz-header">
          <span className="progress-label">
            Question <strong>{currentIndex + 1}</strong> / {total}
          </span>
          <span className="timer" style={{ color: timerColor }}>
            {timeLeft}s
          </span>
        </div>

        {/* Timer bar — width driven by timeLeft state */}
        <div className="timer-bar-track">
          <div
            className="timer-bar-fill"
            style={{ width: `${timerPct}%`, background: timerColor }}
          />
        </div>

        <h2 className="question-text">{question.question}</h2>

        {/* Options list — 🔑 KEY on each option for correct reconciliation */}
        <ul className="options-list">
          {question.options.map((option) => {
            // 🔑 KEY: question.id + option ensures uniqueness across question changes
            const key = `${question.id}-${option}`;
            let cls = "option";
            if (selected === option) cls += locked ? " selected" : " selecting";
            return (
              <li key={key}>
                <button className={cls} onClick={() => handleSelect(option)} disabled={locked}>
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}