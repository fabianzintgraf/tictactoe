'use strict';

jest.dontMock('../PlayersMovement.action');

const appDispatcher = require('./../../AppDispatcher');
const { playersMovementAction, playersMovementActionTypes } = require('../PlayersMovement.action');

describe('When Players movement action is executed', function () {
  const playerIndex = 0;
  const fieldIndex = 8;

  beforeEach(function() {
    playersMovementAction.execute(playerIndex, fieldIndex);
  });

  it('should dispatch the typed event', function () {
    expect(appDispatcher.dispatch).toBeCalledWith(playersMovementActionTypes.TYPED, {
      playerIndex: playerIndex,
      fieldIndex: fieldIndex
    });
  });
});
