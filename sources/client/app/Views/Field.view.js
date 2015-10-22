import React from 'react';
import classnames from 'classnames';
import fieldTypes from '../Stores/fieldTypes';
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
        'is-notSet': this.props.currentField === fieldTypes.NONE,
        'is-player1': this.props.currentField === fieldTypes.PLAYER1,
        'is-player2': this.props.currentField === fieldTypes.PLAYER2,
        'is-winning': this.props.currentField === fieldTypes.WINNING
      });

    return (
      <button className={classNames} 
              disabled={this.props.currentField !== fieldTypes.NONE}
              onClick={this.onFieldClicked.bind(this, this.props.currentActivePlayersIndex, this.props.currentFieldIndex)} />
    );
  }
}

Field.propTypes = {
  currentFieldIndex: React.PropTypes.number,
  currentActivePlayersIndex: React.PropTypes.number
};

export default Field;
