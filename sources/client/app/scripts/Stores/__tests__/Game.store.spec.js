'use strict';

jest.dontMock('../Game.store');
jest.dontMock('../../Actions/StartGame.action');
jest.dontMock('../../Actions/PlayersMovement.action');
jest.dontMock('../../Field');
jest.dontMock('../gameStates');

const gameStore = require('../Game.store');
const fieldTypes = require('../../Field').fieldTypes;
const Field = require('../../Field').Field;
const gameStates = require('../gameStates');
const startGameActionTypes = require('../../Actions/StartGame.action').startGameActionTypes;
const playersMovementActionTypes = require('../../Actions/PlayersMovement.action').playersMovementActionTypes;
const emptyFieldSet = Array.from(new Array(9), () => new Field(fieldTypes.NONE));

describe('When game store is initialized', function() {

  it('Should have no active player set', function() {
    expect(gameStore.getCurrentActivePlayersIndex()).not.toBeDefined();
  });

  it('Should have inactive game', function() {
    expect(gameStore.getGameState()).toEqual(gameStates.NotYetStarted);
  });

  describe('When start game action is called', function() {
    beforeEach(function() {
      gameStore.onAppDispatch({
        type: startGameActionTypes.STARTED,
        payload: {
          player1: 'player 1 name',
          player2: 'player 2 name'
        }
      });
    });

    it('Should have the first player selected as active player', function() {
      expect(gameStore.getCurrentActivePlayersIndex()).toEqual(0);
    });

    it('Should activate game', function() {
      expect(gameStore.getGameState()).toEqual(gameStates.Playing);
    });

    it('Should have an empty field set', function() {
      expect(gameStore.getFields()).toEqual(emptyFieldSet);
    });

    describe('When player1 chooses a field', () => {
      beforeEach(function() {
        gameStore.onAppDispatch({
          type: playersMovementActionTypes.TYPED,
          payload: {
            playerIndex: 0,
            fieldIndex: 0
          }
        });
      });

      it('Should have the second player selected as active player', function() {
        expect(gameStore.getCurrentActivePlayersIndex()).toEqual(1);
      });

      it('Should have set the Tile', function() {
        expect(gameStore.getFields()[0].type).toEqual(fieldTypes.PLAYER1);
      });
    });
  });
});
