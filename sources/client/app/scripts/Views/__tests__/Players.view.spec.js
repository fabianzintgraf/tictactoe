'use strict';

jest.dontMock('../Players.view.js');

const React = require('react/addons');
const Players = require('../Players.view.js');
const updatePlayerAction = require('../../Actions/UpdatePlayer.action.js').updatePlayerAction;
const startGameAction = require('../../Actions/StartGame.action.js').startGameAction;
const TestUtils = React.addons.TestUtils;

describe('When Player is rendered', () => {
  let player = null;

  beforeEach(() => {
    player = TestUtils.renderIntoDocument(<Players/>);
  });

  it('Should contain text to fill the players names', () => {
    expect(React.findDOMNode(player).textContent).toContain('Please enter the names of the two players');
  });

  it('Should have 2 labels', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(player, 'label').length).toEqual(2);
  });

  it('Should have first label text content of set up player 1 name', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(player, 'label')[0].getDOMNode().textContent).toEqual('Name of player 1: ');
  });

  it('Should have second label text content of set up player 2 name', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(player, 'label')[1].getDOMNode().textContent).toEqual('Name of player 2: ');
  });

  it('Should have first input field with empty value', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(player, 'input')[0].getDOMNode().value).toEqual('');
  });

  it('Should have second input field with empty value', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(player, 'input')[1].getDOMNode().value).toEqual('');
  });

  it('Should have disabled create game button', () => {
    expect(TestUtils.findRenderedDOMComponentWithTag(player, 'button').getDOMNode().disabled).toBeTruthy();
  });

  describe('When player1 changes his name', () => {

    beforeEach(()=> {
      updatePlayerAction.execute = jest.genMockFunction();
    });

    beforeEach(()=> {
      const player1Input = TestUtils.scryRenderedDOMComponentsWithTag(player, 'input')[0].getDOMNode();
      player1Input.value = 'player 1 name';
      TestUtils.Simulate.change(player1Input);
    });

    it('Should trigger the update player action for player 1', () => {
      expect(updatePlayerAction.execute).toBeCalledWith('player 1 name', 0);
    });

  });

  describe('When player2 changes his name', () => {

    beforeEach(()=> {
      updatePlayerAction.execute = jest.genMockFunction();
    });

    beforeEach(()=> {
      const player2Input = TestUtils.scryRenderedDOMComponentsWithTag(player, 'input')[1].getDOMNode();
      player2Input.value = 'player 2 name';
      TestUtils.Simulate.change(player2Input);
    });

    it('Should trigger the update player action for player 2', () => {
      expect(updatePlayerAction.execute).toBeCalledWith('player 2 name', 1);
    });
  });

  describe('When can create game is true', () => {

    beforeEach(()=> {
      player = TestUtils.renderIntoDocument(<Players players={['player1 name', 'player2 name']} canStartGame="true" />);
    });

    it('Should have an enabled create game button', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag(player, 'button').getDOMNode().disabled).toBeFalsy();
    });

    describe('When user clicks on create game button', () => {
      beforeEach(()=> {
        startGameAction.execute = jest.genMockFunction();
      });

      beforeEach(()=> {
        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(player, 'button'));
      });

      it('Should call start game action', () => {
        expect(startGameAction.execute).toBeCalledWith('player1 name', 'player2 name');
      });
    });
  });
});
