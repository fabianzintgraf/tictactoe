import React from 'react';

class Home extends React.Component {

  render() {
		return (
			<div>
				<h1>Welcome to the TicTacToe application</h1>
        <section>
          <h2>First of all we need the names of the two player:</h2>
          <p>
            <label for="player1">Name of player1: </label>
            <input type="text" id="player1" />
          </p>
          <p>
            <label for="player2">Name of player2: </label>
            <input type="text" id="player2" />
          </p>
          <button>Let's play</button>
        </section>
			</div>
		);
	}
}

export default Home;
