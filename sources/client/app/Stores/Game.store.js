import { EventEmitter } from 'events';
import appDispatcher from '../AppDispatcher';

const CHANGE_EVENT = 'change';

class GameStore extends EventEmitter {

  constructor() {
    super();

    appDispatcher.register(this.onAppDispatch.bind(this));

    this.players = [];
    this.currentActivePlayersIndex = undefined;
  }

  getPlayers() {
    return this.players;
  }

  getCurrentActivePlayersIndex() {
    return this.currentActivePlayersIndex;
  }

  onAppDispatch(data) {
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default new GameStore();
