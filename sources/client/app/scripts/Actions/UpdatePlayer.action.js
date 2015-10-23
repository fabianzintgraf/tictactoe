import appDispatcher from './../AppDispatcher';

const updatePlayerActionTypes = {
  UPDATED: 'UpdatePlayerAction.UPDATED'
};

class UpdatePlayerAction {
  execute(value, index) {
    appDispatcher.dispatch(updatePlayerActionTypes.UPDATED, {
      name: value,
      playerIndex: index
    });
  }
}

export default { updatePlayerAction: new UpdatePlayerAction(),
                 updatePlayerActionTypes: updatePlayerActionTypes };
