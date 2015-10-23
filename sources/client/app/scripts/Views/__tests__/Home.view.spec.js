'use strict';

jest.dontMock('../Home.view.js');

const React = require('react/addons');
const Home = require('../Home.view.js');
const TestUtils = React.addons.TestUtils;

describe('When Home is rendered', () => {
  let home = null;

  beforeEach(() => {
    home = TestUtils.renderIntoDocument(<Home/>);
  });

  it('Should contain hello world', () => {
    expect(React.findDOMNode(home).textContent).toContain('Welcome to the TicTacToe application');
  });
});
