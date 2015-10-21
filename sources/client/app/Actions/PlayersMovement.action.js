import appDispatcher from './../AppDispatcher';

const playersMovementActionTypes = {
  TYPED: 'PlayersMovement.TYPED'
};

class PlayersMovement {
  execute(playerIndex, fieldIndex) {
    appDispatcher.dispatch(playersMovementActionTypes.TYPED, {
      playerIndex: playerIndex,
      fieldIndex: fieldIndex
    });
  }
}

export default { playersMovementAction: new PlayersMovement(),
                 playersMovementActionTypes: playersMovementActionTypes };
