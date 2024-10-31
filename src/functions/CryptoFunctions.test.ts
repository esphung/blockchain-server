import { calculateHash } from "./CryptoFunctions";
import CryptoJS from "crypto-js";

jest.mock("crypto-js", () => ({
  SHA256: jest.fn(),
}));

describe("calculateHash", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate the correct hash", () => {
    const index = 1;
    const previousHash = "somePreviousHash";
    const timestamp = 1620000000000;
    const data = "Some Data";
    const expectedHash = "expectedHashValue";

    (CryptoJS.SHA256 as jest.Mock).mockReturnValue({
      toString: jest.fn().mockReturnValue(expectedHash),
    });

    const hash = calculateHash(index, previousHash, timestamp, data);

    expect(CryptoJS.SHA256).toHaveBeenCalledWith(
      index + previousHash + timestamp + data
    );
    expect(hash).toBe(expectedHash);
  });

  it("should call CryptoJS.SHA256 with the correct concatenated string", () => {
    const index = 2;
    const previousHash = "anotherPreviousHash";
    const timestamp = 1620000000001;
    const data = "Another Data";

    calculateHash(index, previousHash, timestamp, data);

    expect(CryptoJS.SHA256).toHaveBeenCalledWith(
      index + previousHash + timestamp + data
    );
  });
});
