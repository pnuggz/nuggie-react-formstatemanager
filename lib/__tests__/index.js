"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idProp = 'nuggie-tooltip-default';
var text = 'Hey There';
var children = 'Hover over me';
afterEach(_reactTestingLibrary.cleanup);
test('renders the children properly', function () {
  var App = function App() {
    return _react.default.createElement(_index.default, {
      tooltipRender: text
    }, children);
  };

  var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(App, null)),
      getByText = _render.getByText;

  expect(getByText(children).innerHTML).toBe(children);
});
test('does not render tooltip initially', function () {
  var App = function App() {
    return _react.default.createElement(_index.default, {
      tooltipRender: text
    }, children);
  };

  var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(App, null)),
      getByTestId = _render2.getByTestId;

  expect(getByTestId(idProp).innerHTML).toBe('');
});
test('renders tooltip on mouseenter and hides on mouseleave', function () {
  var App = function App() {
    return _react.default.createElement(_index.default, {
      tooltipRender: text
    }, children);
  };

  var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(App, null)),
      getByText = _render3.getByText,
      getByTestId = _render3.getByTestId;

  (0, _reactTestingLibrary.fireEvent)(getByText(children), new MouseEvent('mouseenter', {
    bubbles: true
  }));
  expect(getByText(text).textContent).toBe(text);
  (0, _reactTestingLibrary.fireEvent)(getByText(children), new MouseEvent('mouseleave', {
    bubbles: true
  }));
  expect(getByTestId(idProp).textContent).toBe('');
});
test('renders tooltip on focus and hides on blur', function () {
  var App = function App() {
    return _react.default.createElement(_index.default, {
      tooltipRender: text
    }, children);
  };

  var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(App, null)),
      getByText = _render4.getByText,
      getByTestId = _render4.getByTestId;

  (0, _reactTestingLibrary.fireEvent)(getByText(children), new Event('focus', {
    bubbles: true
  }));
  expect(getByText(text).textContent).toBe(text);
  (0, _reactTestingLibrary.fireEvent)(getByText(children), new Event('blur', {
    bubbles: true
  }));
  expect(getByTestId(idProp).textContent).toBe('');
});