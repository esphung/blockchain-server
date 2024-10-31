import type { IBlock, IGenesisBlock } from "../models/Block";
import {
  genesisBlock,
  getBlockchain,
  setBlockchain,
} from "../models/BlockChain";
import { isValidNewBlock } from "./BlockFunctions";

export const isValidChain = (
  blockchainToValidate: Array<IBlock | IGenesisBlock>
): boolean => {
  const isValidGenesis = (block: IBlock | IGenesisBlock): boolean => {
    return JSON.stringify(block) === JSON.stringify(genesisBlock);
  };

  if (!isValidGenesis(blockchainToValidate[0])) {
    return false;
  }

  for (let i = 1; i < blockchainToValidate.length; i++) {
    if (
      !isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])
    ) {
      return false;
    }
  }
  return true;
};

function broadcastLatest() {
  // Implementation for broadcasting the latest block to the network
  console.debug("Broadcasting latest block...");
}

export const replaceChain = (newBlocks: (IBlock | IGenesisBlock)[]) => {
  if (isValidChain(newBlocks) && newBlocks.length > getBlockchain().length) {
    console.debug(
      "Received blockchain is valid. Replacing current blockchain with received blockchain"
    );
    setBlockchain(newBlocks);
    broadcastLatest();
  } else {
    console.debug("Received blockchain invalid");
  }
};
