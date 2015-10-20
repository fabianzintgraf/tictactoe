import React from 'react';
import { startGameAction } from '../Actions/StartGame.action';
import gameStore from '../Stores/Game.store';

class Home extends React.Component {

  constructor() {
    super();

    this.state = { players: [] };
  }

  componentDidMount() {
    gameStore.addChangeListener(this.updateState.bind(this));
  }

  componentWillUnmount() {
    gameStore.removeChangeListener(this.updateState.bind(this));
  }

  updateState() {
    this.setState({
      players: gameStore.getPlayers()
    });
  }

  onCreateGameExecute(players) {
    startGameAction.execute(players[0], players[1]);
  }

  render() {

		return (
			<div>
				<h1>Welcome to the TicTacToe application</h1>
        <section>
          <h2>First of all we need the names of the two player:</h2>
          { this.renderPlayer(this.state.players[0], 0) }
          { this.renderPlayer(this.state.players[1], 1) }
          <button onClick={this.onCreateGameExecute(this.state.players)}>Lets play...</button>
        </section>
			</div>
		);
	}

  renderPlayer(player, index) {
    const indexName = 'player' + index;
    return (
      <p key={indexName}>
        <label for={indexName}>Name of player1: </label>
        <input type="text" id={indexName} value={player} />
      </p>
      );
  }
}

export default Home;
