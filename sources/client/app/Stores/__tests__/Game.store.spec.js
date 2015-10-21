'use strict';

jest.dontMock('../Game.store');
jest.dontMock('../../Actions/StartGame.action');

const gameStore = require('../Game.store');
const startGameActionTypes = require('../../Actions/StartGame.action').startGameActionTypes;

describe('When game store is initialized', function() {

  it('Should have no active player set', function () {
    expect(gameStore.getCurrentActivePlayersIndex()).not.toBeDefined();
  });

  describe('When start game action is called', function() {
     beforeEach(function() {
      gameStore.onAppDispatch({ type: startGameActionTypes.STARTED, payload: { player1: 'player 1 name', player2: 'player 2 name' } });
    });

    it('Should habe the first player selected as active player', function () {
      expect(gameStore.getCurrentActivePlayersIndex()).toEqual(0);
    });

    it('Should activate game', function () {
      expect(gameStore.isGameActive()).toBeTruthy();
    });
  });
});
