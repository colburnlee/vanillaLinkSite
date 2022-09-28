const snippet = [
  {
    answer: 39178992539,
    answeredInRound: "55340232221128654849",
    price: 391.79,
    roundId: "55340232221128654850",
    startedAt: 1596756349,
    updatedAt: 1596759303,
  },
  {
    answer: 39178992539,
    answeredInRound: "55340232221128654849",
    price: 391.79,
    roundId: "55340232221128654851",
    startedAt: 1596759303,
    updatedAt: 1596760234,
  },
];

const JSONSnippet = () => {
  return (
    <div className="flex flex-auto p-2 text-gray-300 bg-gray-800 rounded-lg mt-6 overflow-auto text-xs max-w-sm sm:max-w-lg md:max-w-full  md:text-base lg:w-full ">
      <pre className="flex flex-col ">
        <code className="flex ">{JSON.stringify(snippet, null, 2)}</code>
        <br />
      </pre>
    </div>
  );
};

export { JSONSnippet };
