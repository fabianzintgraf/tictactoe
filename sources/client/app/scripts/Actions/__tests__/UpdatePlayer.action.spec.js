'use strict';

jest.dontMock('../UpdatePlayer.action');

const appDispatcher = require('./../../AppDispatcher');
const { updatePlayerAction, updatePlayerActionTypes } = require('../UpdatePlayer.action');

describe('When UpdatePlayer is executed', function () {
  const player1Name = 'player1 name';
  const index = 0;

  beforeEach(function() {
    updatePlayerAction.execute(player1Name, index);
  });

  it('should dispatch the updated event', function () {
    expect(appDispatcher.dispatch).toBeCalledWith(updatePlayerActionTypes.UPDATED, {
      name: player1Name,
      playerIndex: index
    });
  });
});
