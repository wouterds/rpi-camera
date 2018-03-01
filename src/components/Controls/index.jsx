//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';


class Controls extends Component<{}>
{
  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    return (
      <div className={styles.controls}>
        Controls
      </div>
    );
  }
}

export default Controls;
