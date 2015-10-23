import { EventEmitter } from 'events';
import appDispatcher from '../AppDispatcher';
import { startGameActionTypes } from '../Actions/StartGame.action';
import { playersMovementActionTypes } from '../Actions/PlayersMovement.action';
import { fieldTypes, Field } from '../Field';
import gameStates from './gameStates';
import winningService from '../services/Winning.service';
const CHANGE_EVENT = 'change';

class GameStore extends EventEmitter {

  constructor() {
    super();

    appDispatcher.register(this.onAppDispatch.bind(this));

    this.currentActivePlayersIndex = undefined;
    this.gameState = gameStates.NotYetStarted;
    this.fields = Array.from(new Array(9), () => new Field(fieldTypes.NONE));
  }

  getCurrentActivePlayersIndex() {
    return this.currentActivePlayersIndex;
  }

  getFields() {
    return this.fields;
  }

  getGameState() {
    return this.gameState;
  }

  onAppDispatch(data) {
    switch (data.type) {
    case playersMovementActionTypes.TYPED:
      this.fields[data.payload.fieldIndex] = data.payload.playerIndex === 0 ? new Field(fieldTypes.PLAYER1) : new Field(fieldTypes.PLAYER2);
      if (winningService.hasThreeInARow(this.fields)) {
        this.fields = winningService.markWinningFields(this.fields);
        this.gameState = gameStates.OverWithWinner;
      } else if (winningService.isDrawn(this.fields)) {
        this.gameState = gameStates.OverWithDrawn;
      } else {
        this.currentActivePlayersIndex = this.currentActivePlayersIndex === 0 ? 1 : 0;
      }
      this.emit(CHANGE_EVENT);
      break;
    case startGameActionTypes.STARTED:
      this.currentActivePlayersIndex = 0;
      this.gameState = gameStates.Playing;
      this.fields = Array.from(new Array(9), () => new Field(fieldTypes.NONE));
      this.emit(CHANGE_EVENT);
      break;
    default:
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
