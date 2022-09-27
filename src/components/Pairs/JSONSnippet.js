const JSONSnippet = () => {
  // Returns a JSON snippet
  //   return (
  //     <div className="flex flex-col w-full h-full p-2 text-gray-600 bg-gray-800 rounded-lg">
  //       <pre>
  //         <code>answer: 39178992539, // Number</code>
  //       </pre>
  //       <pre>
  //         <code>answeredInRound: "55340232221128654849", // String</code>
  //       </pre>
  //       <pre>
  //         <code>price: 391.79, // Number </code>
  //       </pre>
  //       <pre>
  //         <code>roundId: "55340232221128654850", // String</code>
  //       </pre>
  //       <pre>
  //         <code>startedAt: 1596756349, // Number</code>
  //       </pre>
  //       <pre>
  //         <code>updatedAt: 1596759303, // Number</code>
  //       </pre>
  //     </div>
  //   );
  return (
    <div className="flex p-2 text-gray-300 bg-gray-800 rounded-lg mt-12 overflow-auto text-xs md:text-base lg:w-full">
      <pre className="flex flex-col ">
        <code>answer: 39178992539, // Number</code>
        <code>answeredInRound: "55340232221128654849", // String</code>
        <code>price: 391.79, // Number </code>
        <code>roundId: "55340232221128654850", // String</code>
        <code>startedAt: 1596756349, // Number</code>
        <code>updatedAt: 1596759303, // Number</code>
      </pre>
    </div>
  );
};

export { JSONSnippet };
