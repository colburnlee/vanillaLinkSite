import { connectProviderContract } from "../ethers/connectProviderContract";

const getCustomAnswers = async (rounds, proxy, network) => {
  const contract = await connectProviderContract(proxy, network);
  let customAnswers = await Promise.all(
    rounds.map(async (round) => {
      const customAnswer = await contract.getRoundData(round);
      return customAnswer;
    })
  );
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
