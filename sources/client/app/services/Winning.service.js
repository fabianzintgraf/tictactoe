import fieldTypes from '../Stores/fieldTypes';

class WinningService {

	constructor() {
		this.winningFieldIndexes = [ [0, 1, 2] ];
	}

	isTypedField(field) {
		return field === fieldTypes.PLAYER1 ||
			   field === fieldTypes.PLAYER2;
	}

	findIndexOfWinnerCombination(fields) {
		const potentialWinners = this.winningFieldIndexes.map(indexes => {
			return this.isTypedField(fields[indexes[0]]) && 
			 	   fields[indexes[0]] === fields[indexes[1]] && 
			 	   fields[indexes[0]] === fields[indexes[2]];  
		});

		return potentialWinners.find(x => x === true);
	}

	hasThreeInARow(fields) {
		return this.findIndexOfWinnerCombination(fields) !== undefined;
	}
}

export default new WinningService();