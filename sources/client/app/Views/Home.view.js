import React from 'react';
import Players from './Players.view';

class Home extends React.Component {

  constructor() {
    super();
  }

  render() {
		return (
			<div>
				<h1>Welcome to the TicTacToe application</h1>
        <Players />
			</div>
		);
	}
}

export default Home;
