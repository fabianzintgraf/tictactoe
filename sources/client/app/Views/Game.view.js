import React from 'react';
import gameStore from '../Stores/Game.store';

class Game extends React.Component {

  constructor(props) {
    super();

    this.state = { isActive: props.isActive || false,
                  currentActivePlayersIndex: props.currentActivePlayersIndex >= 0 ? props.currentActivePlayersIndex : undefined };
  }

  componentDidMount() {
    gameStore.addChangeListener(this.updateState.bind(this));
  }

  componentWillUnmount() {
    gameStore.removeChangeListener(this.updateState.bind(this));
  }

  updateState() {
    this.setState({
      isActive: gameStore.isGameActive()
    });
  }

  render() {
    if(!this.state.isActive) {
      return (<div />);
    }

		return (
			<div>
        <h2>Lets play the game...</h2>
        <p>Current player is player { this.state.currentActivePlayersIndex + 1 }!</p>
			</div>
		);
	}
}

Game.propTypes = {
  isActive: React.PropTypes.bool,
  currentActivePlayersIndex: React.PropTypes.number
};

export default Game;
