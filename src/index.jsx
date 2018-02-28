import ReactDOM from 'react-dom';
import React from 'react';

/**
 * Render the component
 *
 * @returns {Node}
 */
const Index = () => {
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
