//@flow
import ReactDOM from 'react-dom';
import React from 'react';
import type { Node } from 'react';
import 'styles/core.css';

/**
 * Render the component
 *
 * @returns {Node}
 */
const Index = (): Node => {
  return (
    <div>
      Hello World!
    </div>
  );
};

const root = document.getElementById('root');

if (root === null) {
  throw new Error('Could not find root element!');
}

ReactDOM.render(<Index />, root);
