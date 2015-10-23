const fieldTypes = {
  NONE: '',
  PLAYER1: '1',
  PLAYER2: '2'
};

class Field {
	constructor(type) {
		this.type = type ? type : fieldTypes.NONE;
		this.isWinning = false;
	}
}

export default {
	Field: Field,
	fieldTypes: fieldTypes
};