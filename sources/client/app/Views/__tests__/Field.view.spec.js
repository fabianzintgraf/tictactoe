'use strict';

jest.dontMock('../Field.view');
jest.dontMock('../../Field');

const React = require('react/addons');
const FieldView = require('../Field.view.js');
const fieldTypes = require('../../Field').fieldTypes;
const Field = require('../../Field').Field;
const playersMovementAction = require('../../Actions/PlayersMovement.action').playersMovementAction;
const TestUtils = React.addons.TestUtils;

describe('When empty Field is rendered', () => {
  let field = null;

  beforeEach(() => {
    field = TestUtils.renderIntoDocument(<FieldView currentField={new Field(fieldTypes.NONE)} currentFieldIndex={1} currentActivePlayersIndex={1} />);
  });

  it('Should have state of not set', () => {
    expect(React.findDOMNode(field).className).toEqual('FieldButton is-notSet');
  });

  it('Should have enabled the field', () => {
    expect(React.findDOMNode(field).disabled).toBeFalsy();
  });

  describe('When player1 clicks on a free field', () => {
    beforeEach(() => {
      playersMovementAction.execute = jest.genMockFunction();
    });

    beforeEach(() => {
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(field, 'button').getDOMNode());
    });

    it('Should call the players movement action', () => {
      expect(playersMovementAction.execute).toBeCalledWith(1, 1);
    });
  });
});

describe('When player1 selected Field is rendered', () => {
  let field = null;

  beforeEach(() => {
    field = TestUtils.renderIntoDocument(<FieldView currentField={new Field(fieldTypes.PLAYER1)} />);
  });

  it('Should have state of player1 selected', () => {
    expect(React.findDOMNode(field).className).toEqual('FieldButton is-player1');
  });

  it('Should have disabled the field', () => {
    expect(React.findDOMNode(field).disabled).toBeTruthy();
  });
});

describe('When player2 selected Field is rendered', () => {
  let field = null;

  beforeEach(() => {
    field = TestUtils.renderIntoDocument(<FieldView currentField={new Field(fieldTypes.PLAYER2)} />);
  });

  it('Should have state of player2 selected', () => {
    expect(React.findDOMNode(field).className).toEqual('FieldButton is-player2');
  });

  it('Should have disabled the field', () => {
    expect(React.findDOMNode(field).disabled).toBeTruthy();
  });
});

describe('When a Field is disabled', () => {
  let field = null;

  beforeEach(() => {
    field = TestUtils.renderIntoDocument(<FieldView currentField={new Field()} disabled={true} />);
  });

  it('Should have a disabled field', () => {
    expect(React.findDOMNode(field).disabled).toBeTruthy();
  });
});
