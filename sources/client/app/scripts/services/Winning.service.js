import {
  fieldTypes
}
from '../Field';

class WinningService {

  constructor() {
    this.winningCombinationFieldIndexes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

  isTypedField(field) {
    return field.type === fieldTypes.PLAYER1 ||
      field.type === fieldTypes.PLAYER2;
  }

  findIndexOfWinnerCombination(fields) {
    const potentialWinners = this.winningCombinationFieldIndexes.map(indexes => {
      return this.isTypedField(fields[indexes[0]]) &&
        fields[indexes[0]].type === fields[indexes[1]].type &&
        fields[indexes[0]].type === fields[indexes[2]].type;
    });

    return potentialWinners.findIndex(x => x === true);
  }

  hasThreeInARow(fields) {
    return this.findIndexOfWinnerCombination(fields) >= 0;
  }

  isDrawn(fields) {
    return fields.findIndex(field => !this.isTypedField(field)) < 0;
  }

  markWinningFields(fields) {
    const indexOfWinnerCombination = this.findIndexOfWinnerCombination(fields);
    if (indexOfWinnerCombination >= 0) {
      this.winningCombinationFieldIndexes[indexOfWinnerCombination].map(index => {
        fields[index].isWinning = true;
      });
    }
    return fields;
  }
}

export default new WinningService();
