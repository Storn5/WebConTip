import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest-mock';
import history from './history';
import LoginForm from './LoginForm';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginForm history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Login Component', () => {
  let wrapper;
  const mockedEvent = { target: {}, preventDefault: () => {} }
  const alert = jest.fn();
  const handleSubmit = jest.fn(() => { 
    let options = {
      method: "POST",
      body: JSON.stringify(wrapper.state()),
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    }
    console.log("Fetching some stuff!!!");
    fetch('http://localhost:8000/api/v1/auth/login/', options)
    .then(res => {
      if (res.status != 200){
        console.log("WRONG!!!");
        alert("Wrong credentials!");
        return false;
      }
      console.log("SUCCESS!!!");
      alert("Success! Logged in!");
      return res.json();
    })
  });
  const successAlert = {
    alertMessage: "Success! Logged in!"
  }
  const errorAlert = {
    alertMessage: "Wrong credentials!"
  }
  beforeEach(() => {
    wrapper = shallow(<LoginForm history={history} />);
  });
  it('"handleSubmit" to have been called with "new", "123"', done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper.find('#input-auth-username').simulate('change', { target: { value: 'new' } });
    expect(wrapper.state().username).toBe('new');
    wrapper.find('#input-auth-password').simulate('change', { target: { value: '123' } });
    expect(wrapper.state().password).toBe('123');

    expect(wrapper.find('#input-auth-form').length).toBe(1);
    fetch.mockReturnValue(Promise.resolve(new Response('4')));
    wrapper.find('#input-auth-form').simulate('submit', mockedEvent);
    expect(global.fetch).toHaveBeenCalled();
    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });

  it('"handleSubmit" to have been called with "storn", "012"', done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    wrapper.find('#input-auth-username').simulate('change', { target: { value: 'storn' } });
    expect(wrapper.state().username).toBe('storn');
    wrapper.find('#input-auth-password').simulate('change', { target: { value: '012' } });
    expect(wrapper.state().password).toBe('012');

    expect(wrapper.find('#input-auth-form').length).toBe(1);
    wrapper.find('#input-auth-form').simulate('submit', mockedEvent);
    expect(global.fetch).toHaveBeenCalled();
    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });
});