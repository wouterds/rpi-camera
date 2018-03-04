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
    const cameraStream = `${location.protocol}//${location.hostname}:8080?action=stream`;

    return (
      <div className={styles.camera}>
        <img src={cameraStream} />
      </div>
    );
  }
}

export default App;
