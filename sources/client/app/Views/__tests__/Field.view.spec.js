'use strict';

jest.dontMock('../Field.view');
jest.dontMock('../../Stores/fieldTypes');

const React = require('react/addons');
const Field = require('../Field.view.js');
const fieldTypes = require('../../Stores/fieldTypes');
const TestUtils = React.addons.TestUtils;

describe('When empty Field is rendered', () => {
  let field = null;

  beforeEach(() => {
    field = TestUtils.renderIntoDocument(<Field currentField={fieldTypes.NONE} />);
  });

  it('Should have state of not set', () => {
    expect(React.findDOMNode(field).className).toEqual('FieldButton is-notSet');
  });
});

describe('When player1 selected Field is rendered', () => {
  let field = null;

  beforeEach(() => {
    field = TestUtils.renderIntoDocument(<Field currentField={fieldTypes.PLAYER1} />);
  });

  it('Should have state of player1 selected', () => {
    expect(React.findDOMNode(field).className).toEqual('FieldButton is-player1');
  });
});

describe('When player2 selected Field is rendered', () => {
  let field = null;

  beforeEach(() => {
    field = TestUtils.renderIntoDocument(<Field currentField={fieldTypes.PLAYER2} />);
  });

  it('Should have state of player2 selected', () => {
    expect(React.findDOMNode(field).className).toEqual('FieldButton is-player2');
  });
});
