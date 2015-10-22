jest.dontMock('../Winning.service');
jest.dontMock('../../Stores/fieldTypes');

const fieldTypes = require('../../Stores/fieldTypes');
const winningService = require('../Winning.service');
const emptyFieldSet = Array.from(new Array(9), () => fieldTypes.NONE);

describe('When fieldset is empty', () => {
	let result;
	beforeEach(() => {
		result = winningService.hasThreeInARow(emptyFieldSet);
	});

	it('Should have not three equal fields in a row', () => {
		expect(result).toBeFalsy();
	});
});

describe('When player 1 has complete upper row', () => {
	let result;
	beforeEach(() => {
		emptyFieldSet[0] = fieldTypes.PLAYER1;
		emptyFieldSet[1] = fieldTypes.PLAYER1;
		emptyFieldSet[2] = fieldTypes.PLAYER1;
		
		result = winningService.hasThreeInARow(emptyFieldSet);
	});

	it('Should have three in a row', () => {
		expect(result).toBeTruthy();
	});
});