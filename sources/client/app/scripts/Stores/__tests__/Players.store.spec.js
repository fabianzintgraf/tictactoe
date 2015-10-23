'use strict';

jest.dontMock('../Players.store');
jest.dontMock('../../Actions/UpdatePlayer.action');

const playersStore = require('../Players.store');
const updatePlayerActionTypes = require('../../Actions/UpdatePlayer.action').updatePlayerActionTypes;

describe('When player store is initialized', function() {

  it('Should have no players set', function() {
    expect(playersStore.getPlayers()).toEqual([]);
  });

  it('Should not be able to start the game', function() {
    expect(playersStore.canStartGame()).toBeFalsy();
  });

  describe('When player1 updates his name', function() {
    beforeEach(function() {
      playersStore.onAppDispatch({
        type: updatePlayerActionTypes.UPDATED,
        payload: {
          playerIndex: 0,
          name: 'player 1 name'
        }
      });
    });

    it('Should have 1 player set', function() {
      expect(playersStore.getPlayers()).toEqual(['player 1 name']);
    });

    it('Should not be able to start the game', function() {
      expect(playersStore.canStartGame()).toBeFalsy();
    });

    describe('When player1 updates his name', function() {
      beforeEach(function() {
        playersStore.onAppDispatch({
          type: updatePlayerActionTypes.UPDATED,
          payload: {
            playerIndex: 1,
            name: 'player 2 name'
          }
        });
      });

      it('Should have 2 player set', function() {
        expect(playersStore.getPlayers()).toEqual(['player 1 name', 'player 2 name']);
      });

      it('Should not be able to start the game', function() {
        expect(playersStore.canStartGame()).toBeTruthy();
      });
    });
  });
});
