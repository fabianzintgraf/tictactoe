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

	describe('When try to mark winning fileds', () => {
		let markedFields;
		beforeEach(() => {
			markedFields = winningService.markWinningFields(emptyFieldSet);
		});

		it('Should mark first field as winner', () => {
			expect(markedFields[0]).toEqual(fieldTypes.WINNING);
		});

		it('Should mark second field as winner', () => {
			expect(markedFields[1]).toEqual(fieldTypes.WINNING);
		});

		it('Should mark third field as winner', () => {
			expect(markedFields[2]).toEqual(fieldTypes.WINNING);
		});
	});
});

describe('When player 1 has complete middle row', () => {
	let result;
	beforeEach(() => {
		emptyFieldSet[3] = fieldTypes.PLAYER1;
		emptyFieldSet[4] = fieldTypes.PLAYER1;
		emptyFieldSet[5] = fieldTypes.PLAYER1;
		
		result = winningService.hasThreeInARow(emptyFieldSet);
	});

	it('Should have three in a row', () => {
		expect(result).toBeTruthy();
	});
});

describe('When player 1 has complete lower row', () => {
	let result;
	beforeEach(() => {
		emptyFieldSet[5] = fieldTypes.PLAYER1;
		emptyFieldSet[7] = fieldTypes.PLAYER1;
		emptyFieldSet[8] = fieldTypes.PLAYER1;

		result = winningService.hasThreeInARow(emptyFieldSet);
	});

	it('Should have three in a row', () => {
		expect(result).toBeTruthy();
	});
});

describe('When player 1 has complete left column', () => {
	let result;
	beforeEach(() => {
		emptyFieldSet[0] = fieldTypes.PLAYER1;
		emptyFieldSet[3] = fieldTypes.PLAYER1;
		emptyFieldSet[6] = fieldTypes.PLAYER1;

		result = winningService.hasThreeInARow(emptyFieldSet);
	});

	it('Should have three in a row', () => {
		expect(result).toBeTruthy();
	});
});

describe('When player 1 has complete middle column', () => {
	let result;
	beforeEach(() => {
		emptyFieldSet[1] = fieldTypes.PLAYER1;
		emptyFieldSet[4] = fieldTypes.PLAYER1;
		emptyFieldSet[7] = fieldTypes.PLAYER1;

		result = winningService.hasThreeInARow(emptyFieldSet);
	});

	it('Should have three in a row', () => {
		expect(result).toBeTruthy();
	});
});

describe('When player 1 has complete right column', () => {
	let result;
	beforeEach(() => {
		emptyFieldSet[2] = fieldTypes.PLAYER1;
		emptyFieldSet[5] = fieldTypes.PLAYER1;
		emptyFieldSet[8] = fieldTypes.PLAYER1;

		result = winningService.hasThreeInARow(emptyFieldSet);
	});

	it('Should have three in a row', () => {
		expect(result).toBeTruthy();
	});
});

describe('When player 1 has first diagonal', () => {
	let result;
	beforeEach(() => {
		emptyFieldSet[0] = fieldTypes.PLAYER1;
		emptyFieldSet[4] = fieldTypes.PLAYER1;
		emptyFieldSet[8] = fieldTypes.PLAYER1;

		result = winningService.hasThreeInARow(emptyFieldSet);
	});

	it('Should have three in a row', () => {
		expect(result).toBeTruthy();
	});
});

describe('When player 1 has second diagonal', () => {
	let result;
	beforeEach(() => {
		emptyFieldSet[2] = fieldTypes.PLAYER1;
		emptyFieldSet[4] = fieldTypes.PLAYER1;
		emptyFieldSet[6] = fieldTypes.PLAYER1;

		result = winningService.hasThreeInARow(emptyFieldSet);
	});

	it('Should have three in a row', () => {
		expect(result).toBeTruthy();
	});
});

