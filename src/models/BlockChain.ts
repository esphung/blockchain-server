import { calculateHash } from "../functions/CryptoFunctions";
import Block, { type IBlock, type IGenesisBlock } from "./Block";

export const genesisBlock = Block({
  index: 0,
  timestamp: Date.now(),
  data: "my genesis block!!",
  hash: "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7",
});

type IBlockChain = Array<IBlock | IGenesisBlock>; // Define the blockchain type

let blockchain: IBlockChain = [genesisBlock]; // Initialize an empty blockchain

function getLatestBlock(): IBlock | IGenesisBlock {
  return blockchain[blockchain.length - 1]; // Return the last block in the array
}

export const generateNextBlock = (blockData: string) => {
  const previousBlock = getLatestBlock();
  const nextIndex = previousBlock.index + 1;
  const nextTimestamp = Date.now();
  const nextHash = calculateHash(
    nextIndex,
    previousBlock.hash,
    nextTimestamp,
    blockData
  );
  const newBlock = Block({
    index: nextIndex,
    previousHash: previousBlock.hash,
    timestamp: nextTimestamp,
    data: blockData,
    hash: nextHash,
  });
  return newBlock as IBlock; // Return the new block
};

export const setBlockchain = (newBlockchain: IBlockChain) => {
  blockchain = newBlockchain; // Update the blockchain
};

export const getBlockchain = () => {
  return blockchain; // Return the blockchain
};
