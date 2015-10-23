import React from 'react';
import classnames from 'classnames';
import { fieldTypes } from '../Field';
import { playersMovementAction } from '../Actions/PlayersMovement.action';

class Field extends React.Component {

  constructor(props) {
    super(props);
  }

  onFieldClicked(currentActivePlayersIndex, currentFieldIndex) {
    playersMovementAction.execute(currentActivePlayersIndex, currentFieldIndex);
  }

  render() {
    const classNames = classnames({
        'FieldButton': true,
        'is-notSet': this.props.currentField.type === fieldTypes.NONE,
        'is-player1': this.props.currentField.type === fieldTypes.PLAYER1,
        'is-player2': this.props.currentField.type === fieldTypes.PLAYER2,
        'is-winning': this.props.currentField.isWinning
      });

    return (
      <button className={classNames} 
              disabled={this.props.currentField.type !== fieldTypes.NONE || this.props.disabled}
              onClick={this.onFieldClicked.bind(this, this.props.currentActivePlayersIndex, this.props.currentFieldIndex)} />
    );
  }
}

Field.propTypes = {
  currentFieldIndex: React.PropTypes.number,
  currentActivePlayersIndex: React.PropTypes.number
};

export default Field;
