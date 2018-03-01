//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';
import cx from 'classnames';

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
      <div className={cx(styles.log, styles[`status--${status}`])}>
        [<span className={styles.status}>{status === 'ok' ? ` ${status} ` : status}</span>] {text}
      </div>
    );
  }
}

export default Log;
