import appDispatcher from './../AppDispatcher';

const startGameActionTypes = {
  CREATED: 'StartGameAction.CREATED'
};

class StartGameAction {
  execute(player1, player2) {
    appDispatcher.dispatch(startGameActionTypes.CREATED, {
      player1: player1,
      player2: player2
    });
  }
}

export default { startGameAction: new StartGameAction(),
                 startGameActionTypes: startGameActionTypes };
