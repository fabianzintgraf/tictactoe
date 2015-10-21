import React from 'react';
import gameStore from '../Stores/Game.store';

class Game extends React.Component {

  constructor() {
    super();

    this.state = { };
  }

  componentDidMount() {
    gameStore.addChangeListener(this.updateState.bind(this));
  }

  componentWillUnmount() {
    gameStore.removeChangeListener(this.updateState.bind(this));
  }

  updateState() {
    this.setState({
    });
  }

  render() {
		return (
			<div>
			</div>
		);
	}
}

export default Game;
