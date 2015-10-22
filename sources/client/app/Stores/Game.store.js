import { EventEmitter } from 'events';
import appDispatcher from '../AppDispatcher';
import { startGameActionTypes } from '../Actions/StartGame.action';
import { playersMovementActionTypes } from '../Actions/PlayersMovement.action';
import fieldTypes from './fieldTypes';
import winningService from '../services/Winning.service';

const CHANGE_EVENT = 'change';

class GameStore extends EventEmitter {

  constructor() {
    super();

    appDispatcher.register(this.onAppDispatch.bind(this));

    this.currentActivePlayersIndex = undefined;
    this.isActive = false;
    this.fields = Array.from(new Array(9), () => fieldTypes.NONE);
  }

  getCurrentActivePlayersIndex() {
    return this.currentActivePlayersIndex;
  }

  getFields() {
    return this.fields;
  }

  isGameActive() {
    return this.isActive;
  }

  onAppDispatch(data) {
    switch(data.type) {
    case playersMovementActionTypes.TYPED:
      this.fields[data.payload.fieldIndex] = data.payload.playerIndex === 0 ? fieldTypes.PLAYER1 : fieldTypes.PLAYER2;
      if(winningService.hasThreeInARow(this.fields)) {
        this.fields = winningService.markWinningFields(this.fields);
        this.winnerPlayerIndex = this.currentActivePlayersIndex;         
        this.isOver = true;
        this.emit(CHANGE_EVENT);
        return;
      }
      this.currentActivePlayersIndex = this.currentActivePlayersIndex === 0 ? 1 : 0;
      this.emit(CHANGE_EVENT);
      break;
    case startGameActionTypes.STARTED:
      this.currentActivePlayersIndex = 0;
      this.isActive = true;
      this.emit(CHANGE_EVENT);
      break;
    }
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default new GameStore();
