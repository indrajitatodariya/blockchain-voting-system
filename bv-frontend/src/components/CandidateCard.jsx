export default function CandidateCard({ candidate, onVote }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 16,
      width: 180,
      textAlign: "center"
    }}>
      <h3>{candidate.name}</h3>
      <p>Votes: {candidate.voteCount}</p>
      <button onClick={() => onVote(candidate.id)}>Vote</button>
    </div>
  );
}
