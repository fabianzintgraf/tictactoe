import React from 'react';
import classnames from 'classnames';
import fieldTypes from '../Stores/fieldTypes';
import { playersMovementAction } from '../Actions/PlayersMovement.action';

class Field extends React.Component {

  constructor(props) {
    super(props);
  }

  onFieldClicked(currentActivePlayersIndex, currentFieldIndex) {
    console.log(currentActivePlayersIndex, currentFieldIndex);
    playersMovementAction.execute(currentActivePlayersIndex, currentFieldIndex);
  }

  render() {
    const classNames = classnames({
        'FieldButton': true,
        'is-notSet': this.props.currentField === fieldTypes.NONE,
        'is-player1': this.props.currentField === fieldTypes.PLAYER1,
        'is-player2': this.props.currentField === fieldTypes.PLAYER2
      });

    return (
      <button className={classNames} 
              onClick={this.onFieldClicked.bind(this, this.props.currentActivePlayersIndex, this.props.currentFieldIndex)} />
    );
  }
}

Field.propTypes = {
  currentFieldIndex: React.PropTypes.number,
  currentActivePlayersIndex: React.PropTypes.number
};

export default Field;
