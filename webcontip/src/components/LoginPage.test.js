import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginPage from './LoginPage';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});