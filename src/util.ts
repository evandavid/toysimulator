import type {RobotFacing} from './components/Robot';

const calculateBlockCenterPositions = (
  blockSize: number,
  imageSize: number,
): {x: number; y: number}[] => {
  const totalBlock = new Array(25).fill(1);
  const rowCount = 5;
  const colCount = 5;

  return totalBlock.map((_, blockIndex) => {
    /** calculate for cols */
    const centerX = blockSize * ((blockIndex % colCount) + 1) - blockSize / 2;
    /** calculate for rows */
    const centerY =
      blockSize * Math.ceil((blockIndex + 1) / rowCount) - blockSize / 2;

    return {x: centerX - imageSize / 2, y: centerY - imageSize / 2};
  });
};

const chunk = (list: any[], chunkSize = 10) => {
  const cloned = [...list];
  const chunks = [];
  for (let i = 0; i < cloned.length; i += chunkSize) {
    const tempArray = cloned.slice(i, i + chunkSize);
    chunks.push(tempArray);
  }
  return chunks;
};

type ACTION = 'MOVE' | 'PLACE' | 'LEFT' | 'RIGHT' | 'REPORT';

type ACTIONS = {
  type: ACTION;
  extraData?: {row: number; col: number; f: RobotFacing};
}[];

const isValidOtherAction = (commands: ACTIONS): boolean => {
  return commands.find(o => o.type === 'PLACE') !== undefined;
};

const isValidToExecute = (commands: ACTIONS): boolean => {
  return commands.length > 0;
};

export {
  calculateBlockCenterPositions,
  chunk,
  isValidOtherAction,
  isValidToExecute,
};
// eslint-disable-next-line no-undef
export type {ACTION, ACTIONS};
