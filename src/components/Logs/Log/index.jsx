//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';

type Props = {
  text: string,
  status: string,
};

class Log extends Component<Props>
{
  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    const { text, status } = this.props;

    return (
      <div className={styles.log}>
          {status}: {text}
      </div>
    );
  }
}

export default Log;
