import {
  calculateBlockCenterPositions,
  chunk,
  isValidOtherAction,
  isValidToExecute,
  isValidAction,
  isEqual,
  getNextMovePosition,
} from '../util';

describe('#calculateBlockCenterPositions', () => {
  it('return list of coordinate to make content center for each block', async () => {
    const blockSize = 60;
    const imageSize = 20;
    const expectedFirstXValue = 20;
    const expectedFirstYValue = 20;
    /** for first block, the coordinate should be
     * center of block - half of image size
     * 30,30 - 10,10
     * 20,20
     */

    const positions = calculateBlockCenterPositions(blockSize, imageSize);
    expect(positions[0]).toEqual({
      x: expectedFirstXValue,
      y: expectedFirstYValue,
    });

    /** for every 5 list, should have same y value */
    [0, 1, 2, 3, 4].forEach(item => {
      expect(positions[item].y).toEqual(expectedFirstYValue);
    });

    /** for every 5 list, the first element should have same x value */
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(item => {
      if (item % 5 === 0) {
        expect(positions[item].x).toEqual(expectedFirstXValue);
      }
    });
  });
});

describe('#chunk', () => {
  it('split array into chunk', async () => {
    const givenArray = [1, 2, 3, 4, 5, 6, 7];
    const chunked = chunk(givenArray, 4);
    expect(chunked).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7],
    ]);
  });

  it('handle undefined list parameter', async () => {
    let givenArray;
    const chunked = chunk(givenArray, 4);
    expect(chunked).toEqual(givenArray);
  });

  it('handle chunkSize larger than list length', async () => {
    const givenArray = [1, 2, 3, 4, 5, 6, 7];
    const chunked = chunk(givenArray, 10);
    expect(chunked).toEqual([givenArray]);
  });
});

describe('#isValidOtherAction', () => {
  it('should start with "PLACE" command to be a valid list of commands', () => {
    const test1 = isValidOtherAction([]);
    expect(test1).toEqual(false);

    const test2 = isValidOtherAction([{type: 'MOVE'}, {type: 'PLACE'}]);
    expect(test2).toEqual(false);

    const test3 = isValidOtherAction([{type: 'PLACE'}, {type: 'PLACE'}]);
    expect(test3).toEqual(true);
  });
});

describe('#isValidToExecute', () => {
  it('should have a list of commands to be executed', () => {
    const test1 = isValidToExecute([]);
    expect(test1).toEqual(false);

    const test3 = isValidToExecute([{type: 'PLACE'}, {type: 'PLACE'}]);
    expect(test3).toEqual(true);
  });
});

describe('#isValidAction', () => {
  describe('validate "PLACE" command', () => {
    it('should have X, Y, and F to be a valid command', () => {
      const test1 = isValidAction('PLACE', {col: 0, row: 0, f: 'NORTH'});
      expect(test1).toEqual(false);

      const test2 = isValidAction(
        'PLACE',
        {col: 0, row: 0, f: 'NORTH'},
        {col: 0, row: 0, f: 'NORTH'},
      );
      expect(test2).toEqual(true);
    });

    it('should validate X and Y boundaries', () => {
      const test1 = isValidAction(
        'PLACE',
        {col: 0, row: 0, f: 'NORTH'},
        {col: -1, row: 0, f: 'NORTH'},
      );
      expect(test1).toEqual(false);

      const test2 = isValidAction(
        'PLACE',
        {col: 0, row: 0, f: 'NORTH'},
        {col: 0, row: -1, f: 'NORTH'},
      );
      expect(test2).toEqual(false);

      const test3 = isValidAction(
        'PLACE',
        {col: 0, row: 0, f: 'NORTH'},
        {col: 5, row: 0, f: 'NORTH'},
      );
      expect(test3).toEqual(false);

      const test4 = isValidAction(
        'PLACE',
        {col: 0, row: 0, f: 'NORTH'},
        {col: 0, row: 5, f: 'NORTH'},
      );
      expect(test4).toEqual(false);

      const test5 = isValidAction(
        'PLACE',
        {col: 0, row: 0, f: 'NORTH'},
        {col: 4, row: 4, f: 'NORTH'},
      );
      expect(test5).toEqual(true);
    });
  });

  describe('validate "MOVE" command', () => {
    /**
     *     N
     * W --|-- E
     *     S
     * row = Y
     * col = X
     */

    it('should validate X and Y boundaries', () => {
      const test1 = isValidAction('MOVE', {col: 5, row: 4, f: 'NORTH'});
      expect(test1).toEqual(false);
      const test2 = isValidAction('MOVE', {col: 4, row: 5, f: 'NORTH'});
      expect(test2).toEqual(false);
    });

    it('should invalidate move if facing EAST and X === 4', () => {
      const test1 = isValidAction('MOVE', {row: 1, col: 4, f: 'EAST'});
      expect(test1).toEqual(false);

      const test2 = isValidAction('MOVE', {row: 2, col: 4, f: 'EAST'});
      expect(test2).toEqual(false);

      const test3 = isValidAction('MOVE', {row: 2, col: 3, f: 'EAST'});
      expect(test3).toEqual(true);
    });

    it('should invalidate move if facing WEST and X === 0', () => {
      const test1 = isValidAction('MOVE', {row: 1, col: 0, f: 'WEST'});
      expect(test1).toEqual(false);

      const test2 = isValidAction('MOVE', {row: 2, col: 0, f: 'WEST'});
      expect(test2).toEqual(false);

      const test3 = isValidAction('MOVE', {row: 2, col: 1, f: 'WEST'});
      expect(test3).toEqual(true);
    });

    it('should invalidate move if facing NORTH and Y === 4', () => {
      const test1 = isValidAction('MOVE', {col: 1, row: 4, f: 'NORTH'});
      expect(test1).toEqual(false);

      const test2 = isValidAction('MOVE', {col: 2, row: 4, f: 'NORTH'});
      expect(test2).toEqual(false);

      const test3 = isValidAction('MOVE', {col: 2, row: 3, f: 'NORTH'});
      expect(test3).toEqual(true);
    });

    it('should invalidate move if facing SOUTH and Y === 0', () => {
      const test1 = isValidAction('MOVE', {col: 1, row: 0, f: 'SOUTH'});
      expect(test1).toEqual(false);

      const test2 = isValidAction('MOVE', {col: 2, row: 0, f: 'SOUTH'});
      expect(test2).toEqual(false);

      const test3 = isValidAction('MOVE', {col: 2, row: 1, f: 'SOUTH'});
      expect(test3).toEqual(true);
    });
  });
});

describe('#isEqual', () => {
  it('should check equality between 2 input', () => {
    const test1 = isEqual(0, 0);
    expect(test1).toEqual(true);

    const test2 = isEqual(0, 1);
    expect(test2).toEqual(false);

    const test3 = isEqual([0], [1]);
    expect(test3).toEqual(false);

    const test4 = isEqual([1], [1]);
    expect(test4).toEqual(true);

    const test5 = isEqual({a: 'a'}, {a: 'a'});
    expect(test5).toEqual(true);

    const te6 = isEqual({a: 'a'}, {a: 'b'});
    expect(te6).toEqual(false);
  });
});

describe('#getNextMovePosition', () => {
  /**
   *     N
   * W --|-- E
   *     S
   * row = Y
   * col = X
   */
  it('should return next move coordinate', () => {
    const test0 = getNextMovePosition({col: 0, row: 0, f: 'NORTH'});
    expect(test0).toEqual({col: 0, row: 1, f: 'NORTH'});

    const test1 = getNextMovePosition({col: 0, row: 4, f: 'NORTH'});
    expect(test1).toEqual({col: 0, row: 4, f: 'NORTH'});

    const test2 = getNextMovePosition({col: 0, row: 0, f: 'SOUTH'});
    expect(test2).toEqual({col: 0, row: 0, f: 'SOUTH'});

    const test3 = getNextMovePosition({col: 0, row: 1, f: 'SOUTH'});
    expect(test3).toEqual({col: 0, row: 0, f: 'SOUTH'});

    const test4 = getNextMovePosition({col: 0, row: 0, f: 'EAST'});
    expect(test4).toEqual({col: 1, row: 0, f: 'EAST'});

    const test5 = getNextMovePosition({col: 4, row: 0, f: 'EAST'});
    expect(test5).toEqual({col: 4, row: 0, f: 'EAST'});

    const test6 = getNextMovePosition({col: 0, row: 0, f: 'WEST'});
    expect(test6).toEqual({col: 0, row: 0, f: 'WEST'});

    const test7 = getNextMovePosition({col: 1, row: 0, f: 'WEST'});
    expect(test7).toEqual({col: 0, row: 0, f: 'WEST'});
  });
});
