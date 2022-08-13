const Introduction = () => {
  return (
    <div className="introduction">
      <h1>API Reference</h1>
      <ul>
        <li>roundId: The round ID</li>
        <li>answer: The answer for this round</li>
        <li>startedAt: Timestamp of when the round started</li>
        <li>updatedAt: Timestamp of when the round was updated</li>
        <li>answeredInRound: The round ID in which the answer was computed</li>
        <li>price: computed price value (answer**-10^decimals)</li>
      </ul>
    </div>
  );
};

export default Introduction;
