import { connectProviderContract } from "../ethers/connectProviderContract";
import Bottleneck from "bottleneck";

const getCustomAnswers = async (rounds, proxy, network) => {
  const limiter = new Bottleneck({
    maxConcurrent: 2,
    minTime: 1000,
  });

  const contract = await connectProviderContract(proxy, network);

  let customAnswers = await limiter.schedule(() => {
    const customAnswer = rounds.map(async (round) =>
      contract.getRoundData(round)
    );
    return Promise.all(customAnswer);
  });

  // format customAnswers
  customAnswers = customAnswers.map((result) => {
    const customAnswer = result;
    const formattedAnswer = {
      roundId: customAnswer[0].toString(),
      answer: customAnswer[1].toString(),
      startedAt: +customAnswer[2],
      updatedAt: +customAnswer[3],
      answeredInRound: customAnswer[4].toString(),
    };
    return formattedAnswer;
  });
  return JSON.stringify(customAnswers);
};

//   const contract = await connectProviderContract(proxy, network);
//   // takes in rounds array and returns array of answers
//   const getAnswers = async (rounds) => {
//     const answers = [];
//     for (let i = 0; i < rounds.length; i++) {
//       try {
//         console.log(contract);

//         const result = await contract.getRoundData(rounds[i]);
//         let answer = result.answer.toString();
//         let answeredInRound = result.answeredInRound.toString();
//         let roundId = result.roundId.toString();
//         let startedAt = +result.startedAt;
//         let updatedAt = +result.updatedAt;
//         let finalAnswer = {
//           answer,
//           answeredInRound,
//           roundId,
//           startedAt,
//           updatedAt,
//         };
//         answers.push(finalAnswer);
//       } catch (error) {
//         console.log(error);
//         return;
//       }
//     }
//     return answers;
//   };
//   const answers = await getAnswers(rounds);
//   return JSON.stringify(answers);
// };

export { getCustomAnswers };
