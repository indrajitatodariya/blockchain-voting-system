import { useState } from "react";
import Navbar from "./components/Navbar";
import CandidateCard from "./components/CandidateCard";
import { candidates as initialCandidates } from "./data/candidates";

export default function App() {
  const [candidates, setCandidates] = useState(initialCandidates);

  const handleVote = (id) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === id ? { ...c, voteCount: c.voteCount + 1 } : c
      )
    );
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: 20 }}>
        <h1 style={{ marginBottom: 20 }}>Vote for Your Favorite Candidate</h1>
        <div style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap"
        }}>
          {candidates.map(c => (
            <CandidateCard key={c.id} candidate={c} onVote={handleVote} />
          ))}
        </div>
      </main>
    </>
  );
}
