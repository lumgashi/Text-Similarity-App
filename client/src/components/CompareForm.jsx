// components/CompareForm.jsx
import { useState } from "react";

export default function CompareForm() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setScore(null);

    try {
      const response = await fetch("http://localhost:3001/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text1, text2 }),
      });
      const data = await response.json();
      if (response.ok) {
        setScore(data.similarityScore);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to connect to the server");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          placeholder="Enter first text"
          rows="5"
          cols="50"
        />
        <br />
        <textarea
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          placeholder="Enter second text"
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Compare</button>
      </form>
      {score !== null && <p>Similarity Score: {score.toFixed(4)}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
