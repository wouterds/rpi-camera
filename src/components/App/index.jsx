//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';

class App extends Component<{}>
{
  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    return (
      <div className={styles.app}>
        Hello World
      </div>
    );
  }
}

export default App;
