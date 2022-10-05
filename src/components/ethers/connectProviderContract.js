import { getDefaultProvider, Contract } from "ethers";
import { aggregatorV3InterfaceABI } from "./v3AggregatorABI";

// get contract proxy address from rtdb
const connectProviderContract = async (contractAddress, chain) => {
  const networks = {
    ETH: "homestead",
    ETHEREUM: "homestead",
    RINKEBY: "rinkeby",
    KOVAN: "kovan",
    GOERLI: "goerli",
    SOL: "solana",
    MATIC: "matic",
    BSC: "bsc",
    FTM: "ftm",
    AVALANCHE: "avalanche",
  };
  const network = networks[chain];
  const provider = getDefaultProvider(network, {
    infura: `${process.env.REACT_APP_INFURA_TOKEN}`,
  });

  // const provider = getDefaultProvider("https://rpc.ankr.com/eth");
  const contract = new Contract(
    contractAddress,
    aggregatorV3InterfaceABI,
    provider
  );
  return contract;
};

export { connectProviderContract };
