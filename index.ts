import {
  isValidChain,
  replaceChain,
} from "./src/functions/BlockChainFunctions";
import {
  isValidBlockStructure,
  isValidNewBlock,
} from "./src/functions/BlockFunctions";
import { generateNextBlock, getBlockchain } from "./src/models/BlockChain";

// Main function to simulate blockchain operations
function main() {
  const tempBlockChain = [...getBlockchain()]; // Get the current blockchain
  console.debug("Blockchain simulation running...");

  // Generate a new block
  const newBlock = generateNextBlock("some data");
  console.debug("New block generated:", newBlock);

  // Validate the new block
  const previousBlock = tempBlockChain[tempBlockChain.length - 1];
  const isValid = isValidNewBlock(newBlock, previousBlock);
  console.debug("Is the new block valid?", isValid);

  // If the block is valid, add it to the blockchain
  if (!isValid) {
    console.error("Invalid block. Not adding to the blockchain.");
    return;
  }

  // Validate the block structure
  const isValidStructure = isValidBlockStructure(newBlock);
  console.debug("Is the block structure valid?", isValidStructure);

  // If the block structure is valid, add the new block to the blockchain
  if (!isValidStructure) {
    console.error("Invalid block structure. Not adding to the blockchain.");
    return;
  }

  // Add the new block to the blockchain
  tempBlockChain.push(newBlock);

  // Validate the entire blockchain
  const isValidChainBool = isValidChain(tempBlockChain);
  console.debug("Is the blockchain valid?", isValidChainBool);

  if (!isValidChainBool) {
    console.error("Invalid blockchain detected.");
    return;
  }

  // replace the blockchain with a new one
  replaceChain(tempBlockChain); // Uncomment this line if you have a new blockchain to replace with

  // Display the blockchain
  console.debug("Blockchain:", getBlockchain());
}

main(); // Execute the main function
