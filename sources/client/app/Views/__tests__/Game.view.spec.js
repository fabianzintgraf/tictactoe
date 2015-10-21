'use strict';

jest.dontMock('../Game.view.js');

const React = require('react/addons');
const Game = require('../Game.view.js');
const TestUtils = React.addons.TestUtils;

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
      game = TestUtils.renderIntoDocument(<Game isActive={true} currentActivePlayersIndex={ 0 } />);
    });

    it('Should display the game welcome message', () => {
      expect(React.findDOMNode(game).textContent).toContain('Lets play the game...');
    });

    it('Should display that the first player is active', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag(game, 'p').getDOMNode().textContent).toContain('Current player is player 1');
    });
  });

});
