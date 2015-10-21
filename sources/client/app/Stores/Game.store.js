import { EventEmitter } from 'events';
import appDispatcher from '../AppDispatcher';
import { startGameActionTypes } from '../Actions/StartGame.action';

const CHANGE_EVENT = 'change';

class GameStore extends EventEmitter {

  constructor() {
    super();

    appDispatcher.register(this.onAppDispatch.bind(this));

    this.currentActivePlayersIndex = undefined;
  }

  getCurrentActivePlayersIndex() {
    return this.currentActivePlayersIndex;
  }

  onAppDispatch(data) {
    switch(data.type) {
    case startGameActionTypes.CREATED:
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
