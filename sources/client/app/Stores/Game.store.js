import { EventEmitter } from 'events';
import appDispatcher from '../AppDispatcher';
import { startGameActionTypes } from '../Actions/StartGame.action';
import fieldTypes from './fieldTypes';

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
