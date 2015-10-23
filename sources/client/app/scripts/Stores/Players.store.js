import { EventEmitter } from 'events';
import appDispatcher from '../AppDispatcher';
import { updatePlayerActionTypes } from '../Actions/UpdatePlayer.action';

const CHANGE_EVENT = 'change';

class PlayersStore extends EventEmitter {

  constructor() {
    super();

    appDispatcher.register(this.onAppDispatch.bind(this));

    this.players = [];
  }

  getPlayers() {
    return this.players;
  }

  canStartGame() {
    return this.players && this.players.length == 2 && this.players[0] && this.players[1];
  }

  onAppDispatch(data) {
    switch(data.type) {
    case updatePlayerActionTypes.UPDATED:
      this.players[data.payload.playerIndex] = data.payload.name;
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

export default new PlayersStore();
