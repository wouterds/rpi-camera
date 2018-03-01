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
      logs: [
        {
          status: 'info',
          text: 'Hello World',
        },
        {
          status: 'fail',
          text: 'Hello World',
        },
        {
          status: 'ok',
          text: 'Hello World',
        },
      ],
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
          return (<Log status={log.status} text={log.text} key={`log-${logs.indexOf(log)}`} />);
        })}
      </div>
    );
  }
}

export default Logs;
