//@flow
import ReactDOM from 'react-dom';
import React from 'react';
import type { Node } from 'react';
import App from 'components/App';
import styles from 'styles/core.css';

/**
 * Render the component
 *
 * @returns {Node}
 */
const Index = (): Node => {
  return (
    <App />
  );
};

const root = document.getElementById('root');

if (root === null) {
  throw new Error('Could not find root element!');
}

root.className = styles.root;
ReactDOM.render(<Index />, root);
