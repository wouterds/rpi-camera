//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';
import Button from 'components/Button';

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
        <div className={styles.buttons}>
          <div className={styles.buttonWrapper}>
            <Button text='Left' className={styles.button} />
          </div>
          <div className={styles.buttonWrapper}>
            <Button text='Right' className={styles.button} />
          </div>
        </div>
      </div>
    );
  }
}

export default Controls;
