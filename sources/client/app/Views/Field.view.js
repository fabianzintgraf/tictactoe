import React from 'react';
import classnames from 'classnames';
import fieldTypes from '../Stores/fieldTypes';

class Field extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const classNames = classnames({
      'FieldButton': true,
      'is-notSet': this.props.currentField === fieldTypes.NONE,
      'is-player1': this.props.currentField === fieldTypes.PLAYER1,
      'is-player2': this.props.currentField === fieldTypes.PLAYER2
      });

    return (
      <button className={classNames} />
    );
  }
}

export default Field;
