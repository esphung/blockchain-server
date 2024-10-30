interface BlockParams {
  index: number;
  hash: string;
  previousHash: string;
  timestamp: number;
  data: string;
}

interface IBlock extends BlockParams {
  calculateHash: () => string;
}

function Block(props: BlockParams): IBlock {
  const intermediate = {
    index: props.index,
    previousHash: props.previousHash,
    timestamp: props.timestamp,
    data: props.data,
    hash: props.hash,
    calculateHash: function () {
      // TODO: Implement hash calculation logic here
      return `${this.index}${this.previousHash}${this.timestamp}${this.data}`; // Placeholder for hash
    },
  };

  return intermediate;
}

export default Block; // Exporting the Block function
