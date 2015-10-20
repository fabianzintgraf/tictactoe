'use strict';

jest.dontMock('../StartGame.action');

const appDispatcher = require('./../../AppDispatcher');
const { startGameAction, startGameActionTypes } = require('../StartGame.action');

describe('When StartGame is executed', function () {
  const player1Name = 'player1 name';
  const player2Name = 'player2 name';

  beforeEach(function() {
    startGameAction.execute(player1Name, player2Name);
  });

  it('should dispatch the created event', function () {
    expect(appDispatcher.dispatch).toBeCalledWith(startGameActionTypes.CREATED, {
      player1: player1Name,
      player2: player2Name
    });
  });
});
