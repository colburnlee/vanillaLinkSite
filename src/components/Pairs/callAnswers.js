import { connectProviderContract } from "../ethers/connectProviderContract";

const getCustomAnswers = async (rounds, proxy, network) => {
  //   const contract = await connectProviderContract(proxy, network);
  //   console.log("contract: ", contract);
  //   const customAnswers = await Promise.all(
  //     rounds.map(async (round) => {
  //       console.log(round);
  //       const customAnswer = await contract.getRoundData(round);
  //       return customAnswer;
  //     })
  //   );
  //   return customAnswers;

  const contract = await connectProviderContract(proxy, network);
  // takes in rounds array and returns array of answers
  const getAnswers = async (rounds) => {
    const answers = [];
    for (let i = 0; i < rounds.length; i++) {
      console.log("rounds[i]: ", rounds[i].toString());
      let result = await contract.getRoundData(rounds[i].toString());
      let answer = result.answer.toString();
      let answeredInRound = result.answeredInRound.toString();
      let roundId = result.roundId.toString();
      let startedAt = +result.startedAt;
      let updatedAt = +result.updatedAt;
      let finalAnswer = {
        answer,
        answeredInRound,
        roundId,
        startedAt,
        updatedAt,
      };
      answers.push(finalAnswer);
    }
    return answers;
  };
  const answers = await getAnswers(rounds);
  return JSON.stringify(answers);
};

export { getCustomAnswers };
