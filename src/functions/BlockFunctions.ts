import type { IBlock, IGenesisBlock } from "../models/Block";
import { calculateHash } from "./CryptoFunctions";

const calculateHashForBlock = (block: IBlock | IGenesisBlock) => {
  return calculateHash(
    block.index,
    block.previousHash || "",
    block.timestamp,
    block.data
  );
};

export const isValidNewBlock = (
  newBlock: IBlock | IGenesisBlock,
  previousBlock: IBlock | IGenesisBlock
) => {
  if (previousBlock.index + 1 !== newBlock.index) {
    console.debug("invalid index");
    return false;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    console.debug("invalid previoushash");
    return false;
  } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
    console.debug(
      typeof newBlock.hash + " " + typeof calculateHashForBlock(newBlock)
    );
    console.debug(
      "invalid hash: " + calculateHashForBlock(newBlock) + " " + newBlock.hash
    );
    return false;
  }
  return true;
};

export const isValidBlockStructure = (block: IBlock): boolean => {
  return (
    typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.timestamp === "number" &&
    typeof block.data === "string"
  );
};
