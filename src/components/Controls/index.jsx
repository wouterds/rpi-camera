//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';
import Button from 'components/Button';
import axios from 'axios';

class Controls extends Component<{}>
{
  /**
   * Button on click handler
   *
   * @param {string} position
   */
  buttonOnClickHandler(position: string) {
    axios.get(`/servo/${position}`);
  }

  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    return (
      <div className={styles.controls}>
        <div className={styles.buttons}>
          <div className={styles.buttonWrapper}>
            <Button text='Left' className={styles.button} onClick={() => this.buttonOnClickHandler('left')} />
          </div>
          <div className={styles.buttonWrapper}>
            <Button text='Right' className={styles.button} onClick={() => this.buttonOnClickHandler('right')} />
          </div>
        </div>
      </div>
    );
  }
}

export default Controls;
