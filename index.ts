import Block from "./src/models/Block";

const block = Block({
  index: 1,
  previousHash: "0",
  timestamp: Date.now(),
  data: JSON.stringify({ message: "Hello, world!" }),
  hash: "somehash",
});

console.debug("Block:", block);
console.debug("Calculated Hash:", block.calculateHash());
