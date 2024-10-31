import Block, { isGenesisBlock, IBlock, IGenesisBlock } from "./Block";
import { calculateHash } from "../functions/CryptoFunctions";

jest.mock("../functions/CryptoFunctions");

describe("Block", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a genesis block", () => {
    const params = {
      index: 0,
      previousHash: undefined,
      timestamp: Date.now(),
      data: "Genesis Block",
      hash: "",
    };

    const genesisBlock = Block(params);

    expect(genesisBlock.index).toBe(0);
    expect(genesisBlock.previousHash).toBeUndefined();
    expect(genesisBlock.timestamp).toBe(params.timestamp);
    expect(genesisBlock.data).toBe("Genesis Block");
    expect(calculateHash).toHaveBeenCalledWith(
      params.index,
      "",
      params.timestamp,
      params.data
    );
  });

  it("should create a regular block", () => {
    const params = {
      index: 1,
      previousHash: "somehash",
      timestamp: Date.now(),
      data: "Some Data",
      hash: "",
    };

    const block = Block(params);

    expect(block.index).toBe(1);
    expect(block.previousHash).toBe("somehash");
    expect(block.timestamp).toBe(params.timestamp);
    expect(block.data).toBe("Some Data");
    expect(calculateHash).toHaveBeenCalledWith(
      params.index,
      params.previousHash,
      params.timestamp,
      params.data
    );
  });

  it("should identify a genesis block", () => {
    const params = {
      index: 0,
      previousHash: undefined,
      timestamp: Date.now(),
      data: "Genesis Block",
      hash: "",
    };

    expect(isGenesisBlock(params)).toBe(true);
  });

  it("should identify a regular block", () => {
    const params = {
      index: 1,
      previousHash: "somehash",
      timestamp: Date.now(),
      data: "Some Data",
      hash: "",
    };

    expect(isGenesisBlock(params)).toBe(false);
  });
});
