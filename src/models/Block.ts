import { calculateHash } from "../functions/CryptoFunctions";

interface IBaseBlock {
  index: number;
  hash: string;
  timestamp: number;
  data: string;
}

export interface IBlock extends IBaseBlock {
  previousHash: string;
}

export interface IGenesisBlock extends IBaseBlock {
  previousHash: undefined; // The previous hash for the genesis block is always null
}

interface BlockParams {
  index: number;
  previousHash?: string;
  timestamp: number;
  data: string;
  hash: string;
}

export function isGenesisBlock(
  params: BlockParams
): params is BlockParams & { previousHash: undefined } {
  return !params.previousHash; // Check if previousHash is undefined
}

function Block(params: BlockParams) {
  const intermediate = {
    index: params.index,
    previousHash: params.previousHash,
    timestamp: params.timestamp,
    data: params.data,
    hash:
      params.hash ||
      calculateHash(
        params.index,
        params.previousHash || "",
        params.timestamp,
        params.data
      ),
  };
  if ("previousHash" in intermediate && !intermediate.previousHash) {
    // If the previous hash is null, it's a genesis block
    return intermediate;
  }
  return intermediate as IBlock; // Otherwise, it's a regular block
}

export default Block; // Exporting the Block function
