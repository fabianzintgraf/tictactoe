import React from 'react';
import gameStore from '../Stores/Game.store';
import Field from './Field.view';
import gameStates from '../Stores/gameStates';

class Game extends React.Component {

  constructor(props) {
    super();

    this.state = {
      gameState: props.gameState || gameStates.NotYetStarted,
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
    if (this.state.gameState === gameStates.NotYetStarted) {
      return (<div />);
    }

    return (
      <div>
        { this.renderGameStateHeadline() }
        <section className="Fields">
          { this.state.fields.map(this.renderFields.bind(this)) }
        </section>
      </div>
    );
  }

  renderGameStateHeadline() {
    let headline = '';
    let subHeadline = '';

    if (this.state.gameState === gameStates.Playing) {
      headline = `Lets play the game...`;
      subHeadline = `Current player is player ${this.state.currentActivePlayersIndex + 1}!`;
    } else if (this.state.gameState === gameStates.OverWithDrawn) {
      headline = `The game is over...`;
      subHeadline = `DRAWN - There is no winner!`;
    } else if (this.state.gameState === gameStates.OverWithWinner) {
      headline = `The game is over...`;
      subHeadline = `WINNER - player ${this.state.currentActivePlayersIndex + 1} has won!`;
    }

    return (
      <section>
        <h2>{headline}</h2>
        <p>{subHeadline}</p>
      </section>
      );
  }

  renderFields(field, index) {
    return (
      <Field key={index}
             currentActivePlayersIndex={this.state.currentActivePlayersIndex}
             currentField={field}
             currentFieldIndex={index}
             disabled={this.state.gameState === gameStates.OverWithWinner || this.state.gameState === gameStates.OverWithDrawn}></Field>
      );
  }
}

Game.propTypes = {
  isActive: React.PropTypes.bool,
  currentActivePlayersIndex: React.PropTypes.number
};

export default Game;
