import appDispatcher from './../AppDispatcher';

const startGameActionTypes = {
  STARTED: 'StartGameAction.STARTED'
};

class StartGameAction {
  execute(player1, player2) {
    appDispatcher.dispatch(startGameActionTypes.STARTED, {
      player1: player1,
      player2: player2
    });
  }
}

export default { startGameAction: new StartGameAction(),
                 startGameActionTypes: startGameActionTypes };
