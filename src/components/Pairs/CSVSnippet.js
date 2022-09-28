import { unparse } from "papaparse";

const CSVSnippet = () => {
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
    {
      answer: 39178992539,
      answeredInRound: "55340232221128654849",
      price: 391.79,
      roundId: "55340232221128654852",
      startedAt: 1596760234,
      updatedAt: 1596763756,
    },
    {
      answer: 39178992539,
      answeredInRound: "55340232221128654849",
      price: 391.79,
      roundId: "55340232221128654853",
      startedAt: 1596763756,
      updatedAt: 1596767195,
    },
    {
      answer: 39178992539,
      answeredInRound: "55340232221128654849",
      price: 391.79,
      roundId: "55340232221128654854",
      startedAt: 1596767195,
      updatedAt: 1596772512,
    },
    {
      answer: 39178992539,
      answeredInRound: "55340232221128654849",
      price: 391.79,
      roundId: "55340232221128654855",
      startedAt: 1596772512,
      updatedAt: 1596774532,
    },
    {
      answer: 39178992539,
      answeredInRound: "55340232221128654849",
      price: 391.79,
      roundId: "55340232221128654856",
      startedAt: 1596774532,
      updatedAt: 1596785328,
    },
    {
      answer: 39178992539,
      answeredInRound: "55340232221128654849",
      price: 391.79,
      roundId: "55340232221128654857",
      startedAt: 1596785328,
      updatedAt: 1596789207,
    },
    {
      answer: 39178992539,
      answeredInRound: "55340232221128654849",
      price: 391.79,
      roundId: "55340232221128654858",
      startedAt: 1596789207,
      updatedAt: 1596798327,
    },
    {
      answer: 39178992539,
      answeredInRound: "55340232221128654849",
      price: 391.79,
      roundId: "55340232221128654859",
      startedAt: 1596798327,
      updatedAt: 1596803236,
    },
  ];
  const csv = unparse(snippet);
  return (
    <div className="flex flex-auto p-2 text-gray-300 bg-gray-800 rounded-lg mt-12 overflow-auto text-xs max-w-sm sm:max-w-lg md:max-w-full  md:text-base lg:w-full ">
      <pre className="flex flex-col ">
        <code className="flex "> {csv} </code>
      </pre>
    </div>
  );
};

export { CSVSnippet };
