import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import { isTSAnyKeyword } from '@babel/types'

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App></App>, div)
})

