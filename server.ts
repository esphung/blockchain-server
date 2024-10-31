import bodyParser from "body-parser";
import express from "express";
import {
  isValidChain,
  replaceChain,
} from "./src/functions/BlockChainFunctions";
import {
  isValidBlockStructure,
  isValidNewBlock,
} from "./src/functions/BlockFunctions";
import { IBlock } from "./src/models/Block";
import { generateNextBlock, getBlockchain } from "./src/models/BlockChain";

const getSockets = () => {
  // TODO: Implement this function to return the list of connected sockets
  return [];
};

const connectToPeers = (newPeer: string) => {
  // TODO: Implement this function to connect to a new peer
  console.debug("Connecting to peer:", newPeer);
};

const mineBlock = (data: string) => {
  let result: {
    error?: Error;
    success: boolean;
    data?: IBlock;
  } = { success: false };

  const tempBlockChain = [...getBlockchain()]; // Get the current blockchain

  const newBlock: IBlock = generateNextBlock(data);

  // Validate the new block
  const previousBlock = tempBlockChain[tempBlockChain.length - 1];
  const isValid = isValidNewBlock(newBlock, previousBlock);

  // If the block is valid, add it to the blockchain
  if (!isValid) {
    result.error = new Error("Invalid block. Not adding to the blockchain.");
    return result;
  }

  // Validate the block structure
  const isValidStructure = isValidBlockStructure(newBlock);

  // If the block structure is valid, add the new block to the blockchain
  if (!isValidStructure) {
    result.error = new Error(
      "Invalid block structure. Not adding to the blockchain."
    );
    return result;
  }

  // Add the new block to the blockchain
  tempBlockChain.push(newBlock);

  // Validate the entire blockchain
  const isValidChainBool = isValidChain(tempBlockChain);

  if (!isValidChainBool) {
    result.error = new Error("Invalid blockchain detected.");
    return result;
  }

  // replace the blockchain with a new one
  replaceChain(tempBlockChain); // Uncomment this line if you have a new blockchain to replace with

  result.success = true;
  result.data = newBlock;
  return result;
};

const initHttpServer = (myHttpPort: string) => {
  const app = express();

  app.use(bodyParser.json());

  app.get("/blocks", (req, res) => {
    res.send(getBlockchain());
  });

  app.post("/mineBlock", (req, res) => {
    const result = mineBlock(req.body.data);
    if (result.error) {
      res.status(400).send(result.error.message);
    } else {
      res.send(result.data);
    }
  });

  app.get("/peers", (req, res) => {
    res.send(
      getSockets().map(
        (s: any) => s._socket.remoteAddress + ":" + s._socket.remotePort
      )
    );
  });

  app.post("/addPeer", (req, res) => {
    connectToPeers(req.body.peer);
    res.send();
  });

  app.listen(myHttpPort, () => {
    console.debug(
      `Listening in ${process.env.NODE_ENV} mode on port ${myHttpPort}`
    );
  });
};

export { initHttpServer }; // Export the initHttpServer function for external use
