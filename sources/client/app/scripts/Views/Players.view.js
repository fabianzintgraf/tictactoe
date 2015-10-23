import React from 'react';
import { startGameAction } from '../Actions/StartGame.action';
import { updatePlayerAction } from '../Actions/UpdatePlayer.action';
import playersStore from '../Stores/Players.store';

class Players extends React.Component {

  constructor(props) {
    super();

    this.state = { players: props.players || [],
                   canStartGame: props.canStartGame || false };
  }

  componentDidMount() {
    playersStore.addChangeListener(this.updateState.bind(this));
  }

  componentWillUnmount() {
    playersStore.removeChangeListener(this.updateState.bind(this));
  }

  updateState() {
    this.setState({
      players: playersStore.getPlayers(),
      canStartGame: playersStore.canStartGame()
    });
  }

  onCreateGameExecute(players) {
    startGameAction.execute(players[0], players[1]);
  }

  onPlayerUpdate(index, event) {
    updatePlayerAction.execute(event.target.value, index);
  }

  render() {
    return (
      <div>
          <h2>Please enter the names of the two players</h2>
          { this.renderPlayer(0) }
          { this.renderPlayer(1) }
          <button disabled={!this.state.canStartGame} onClick={this.onCreateGameExecute.bind(this, this.state.players)}>Lets play...</button>
      </div>
    );
  }

  renderPlayer(index) {
    return (
      <p key={index}>
        <label htmlFor={index}>Name of player {index + 1}: </label>
        <input onChange={this.onPlayerUpdate.bind(this, index)} type="text" id={index} />
      </p>
      );
  }
}

export default Players;
