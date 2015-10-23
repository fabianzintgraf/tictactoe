'use strict';

jest.dontMock('../Game.view.js');
jest.dontMock('../../Stores/gameStates');

const React = require('react/addons');
const Game = require('../Game.view.js');
const TestUtils = React.addons.TestUtils;
const gameStates = require('../../Stores/gameStates');

describe('When Game is rendered', () => {
  let game = null;

  beforeEach(() => {
    game = TestUtils.renderIntoDocument(<Game/>);
  });

  it('Should contain no content', () => {
    expect(React.findDOMNode(game).textContent).toContain('');
  });

  describe('When Game is active', () => {
    beforeEach(() => {
      game = TestUtils.renderIntoDocument(<Game gameState={gameStates.Playing} currentActivePlayersIndex={ 0 } />);
    });

    it('Should display the game welcome message', () => {
      expect(React.findDOMNode(game).textContent).toContain('Lets play the game...');
    });

    it('Should display that the first player is active', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag(game, 'p').getDOMNode().textContent).toContain('Current player is player 1');
    });
  });

  describe('When Game is over and player1 is the winner', () => {
    beforeEach(() => {
      game = TestUtils.renderIntoDocument(<Game gameState={gameStates.OverWithWinner} currentActivePlayersIndex={ 0 } />);
    });

    it('Should display the game welcome message', () => {
      expect(React.findDOMNode(game).textContent).toContain('The game is over...');
    });

    it('Should display that the first player is active', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag(game, 'p').getDOMNode().textContent).toContain('WINNER - player 1 has won!');
    });
  });

  describe('When Game is over and there is a drawn', () => {
    beforeEach(() => {
      game = TestUtils.renderIntoDocument(<Game gameState={gameStates.OverWithDrawn} currentActivePlayersIndex={ 0 } />);
    });

    it('Should display the game welcome message', () => {
      expect(React.findDOMNode(game).textContent).toContain('The game is over...');
    });

    it('Should display that the first player is active', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag(game, 'p').getDOMNode().textContent).toContain('DRAWN - There is no winner!');
    });
  });

});
