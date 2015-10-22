import React from 'react';
import gameStore from '../Stores/Game.store';
import Field from './Field.view';
import gameStates from '../Stores/gameStates';

class Game extends React.Component {

  constructor(props) {
    super();

    this.state ={ gameState: props.gameState || gameStates.NotYetStarted,
                  currentActivePlayersIndex: props.currentActivePlayersIndex >= 0 ? props.currentActivePlayersIndex : undefined,
                  fields: props.fields || [] 
                };
  }

  componentDidMount() {
    gameStore.addChangeListener(this.updateState.bind(this));
  }

  componentWillUnmount() {
    gameStore.removeChangeListener(this.updateState.bind(this));
  }

  updateState() {
    this.setState({
      gameState: gameStore.getGameState(),
      currentActivePlayersIndex: gameStore.getCurrentActivePlayersIndex(),
      fields: gameStore.getFields()
    });
  }

  render() {
    if(this.state.gameState === gameStates.NotYetStarted) {
      return (<div />);
    }

		return (
			<div>
        <h2>Lets play the game...</h2>
        <p>Current player is player { this.state.currentActivePlayersIndex + 1 }!</p>
        <section className="Fields">
        { this.state.fields.map(this.renderFields.bind(this)) }
        </section>
			</div>
		);
	}

  renderFields(field, index) {
    return (
      <Field key={index} currentActivePlayersIndex={this.state.currentActivePlayersIndex} currentField={field} currentFieldIndex={index}></Field>
      );
  }
}

Game.propTypes = {
  isActive: React.PropTypes.bool,
  currentActivePlayersIndex: React.PropTypes.number
};

export default Game;
