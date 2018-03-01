//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';
import Log from './Log';

type State = {
  logs: Array<{
    status: string,
    text: string,
  }>,
};

class Logs extends Component<{}, State>
{
  constructor() {
    super(...arguments);

    this.state = {
      logs: [],
    };
  }

  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    const { logs } = this.state;

    return (
      <div className={styles.logs}>
        {logs.map((log) => {
          <Log status={log.status} text={log.text} />
        })}
      </div>
    );
  }
}

export default Logs;
