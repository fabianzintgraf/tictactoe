'use strict';

jest.dontMock('../Field.view.js');

const React = require('react/addons');
const Field = require('../Field.view.js');
const TestUtils = React.addons.TestUtils;

describe('When Field is rendered', () => {
  let field = null;

  beforeEach(() => {
    field = TestUtils.renderIntoDocument(<Field/>);
  });

  it('Should contain no content', () => {
    expect(React.findDOMNode(field).textContent).toContain('');
  });
});
