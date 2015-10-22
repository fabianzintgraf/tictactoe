'use strict';

jest.dontMock('../Game.store');
jest.dontMock('../../Actions/StartGame.action');
jest.dontMock('../../Actions/PlayersMovement.action');
jest.dontMock('../fieldTypes');

const gameStore = require('../Game.store');
const fieldTypes = require('../fieldTypes');
const startGameActionTypes = require('../../Actions/StartGame.action').startGameActionTypes;
const playersMovementActionTypes = require('../../Actions/PlayersMovement.action').playersMovementActionTypes;
const emptyFieldSet = Array.from(new Array(9), () => fieldTypes.NONE);

describe('When game store is initialized', function() {

  it('Should have no active player set', function () {
    expect(gameStore.getCurrentActivePlayersIndex()).not.toBeDefined();
  });

  describe('When start game action is called', function() {
     beforeEach(function() {
      gameStore.onAppDispatch({ type: startGameActionTypes.STARTED, payload: { player1: 'player 1 name', player2: 'player 2 name' } });
    });

    it('Should have the first player selected as active player', function () {
      expect(gameStore.getCurrentActivePlayersIndex()).toEqual(0);
    });

    it('Should activate game', function () {
      expect(gameStore.isGameActive()).toBeTruthy();
    });

    it('Should have an empty field set', function () {
      expect(gameStore.getFields()).toEqual(emptyFieldSet);
    });

    describe('When player1 chooses a field', () => {
      beforeEach(function() {
        gameStore.onAppDispatch({ type: playersMovementActionTypes.TYPED, payload: { playerIndex: 0, fieldIndex: 0 } });
      });
  
      it('Should have the second player selected as active player', function () {
        expect(gameStore.getCurrentActivePlayersIndex()).toEqual(1);
      });

      it('Should have set the Tile', function () {
        expect(gameStore.getFields()[0]).toEqual(fieldTypes.PLAYER1);
      });

    });
  });
});
