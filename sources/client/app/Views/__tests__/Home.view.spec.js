'use strict';

jest.dontMock('../Home.view.js');

var React = require('react/addons');
var Home = require('../Home.view.js');
var TestUtils = React.addons.TestUtils;

describe('When Home is rendered', function() {
  var home = null;

  beforeEach(function() {
    home = TestUtils.renderIntoDocument(<Home/>);
  });

  it('Should contain hello world', function() {
    expect(React.findDOMNode(home).textContent).toContain('Hello world');
  });
});
