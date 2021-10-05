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

type ROBOT_POSITION = {col: number; row: number; f: RobotFacing};

type ACTIONS = {
  type: ACTION;
  extraData?: ROBOT_POSITION;
}[];

const isValidOtherAction = (commands: ACTIONS): boolean => {
  return commands.find(o => o.type === 'PLACE') !== undefined;
};

const isValidToExecute = (commands: ACTIONS): boolean => {
  return commands.length > 0;
};

const isValidAction = (
  action: ACTION,
  currentPosition: ROBOT_POSITION,
  extraData?: ROBOT_POSITION,
): boolean => {
  const matrixSize = 4;
  switch (action) {
    case 'PLACE':
      if (!extraData) {
        return false;
      } else {
        if (
          extraData.col > matrixSize ||
          extraData.row > matrixSize ||
          extraData.col < 0 ||
          extraData.row < 0
        ) {
          return false;
        }
      }
      return true;
    case 'MOVE':
      if (
        currentPosition.col > matrixSize &&
        currentPosition.row > matrixSize
      ) {
        return false;
      }

      /**
       *      N
       * W          E
       *      S
       */

      switch (currentPosition.f) {
        case 'EAST':
          return currentPosition.col < matrixSize;
        case 'WEST':
          return currentPosition.col > 0;
        case 'NORTH':
          return currentPosition.row < matrixSize;
        case 'SOUTH':
          return currentPosition.row > 0;
      }

      return true;
    case 'LEFT':
    case 'RIGHT':
    case 'REPORT':
      return true;
  }

  return false;
};

const isEqual = (data1: object, data2: object): boolean => {
  return JSON.stringify(data1) === JSON.stringify(data2);
};

const getNextMovePosition = (
  currentPosition: ROBOT_POSITION,
): ROBOT_POSITION => {
  let {col, row} = currentPosition;

  switch (currentPosition.f) {
    case 'EAST':
      col = col + 1;
      break;
    case 'WEST':
      col = col - 1;
      break;
    case 'NORTH':
      row = row + 1;
      break;
    case 'SOUTH':
      row = row - 1;
      break;
  }
  return {f: currentPosition.f, row, col};
};

export {
  calculateBlockCenterPositions,
  chunk,
  isValidOtherAction,
  isValidToExecute,
  isValidAction,
  isEqual,
  getNextMovePosition,
};
// eslint-disable-next-line no-undef
export type {ACTION, ACTIONS, ROBOT_POSITION};
