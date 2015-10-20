'use strict';

jest.dontMock('../Game.store');

const gameStore = require('../Game.store');

describe('When game store is initialized', function() {

  it('Should contain no players', function () {
    expect(gameStore.getPlayers()).toEqual([]);
  });

  it('Should have no current active player', function () {
    expect(gameStore.getCurrentActivePlayersIndex()).not.toBeDefined();
  });
});
