//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';
import Log from './Log';
import SocketIO from 'socket.io-client';

type LogData = {
  status: string,
  text: string,
};

type State = {
  logs: Array<LogData>,
};

class Logs extends Component<{}, State>
{
  /**
   * Constructor
   */
  constructor() {
    super(...arguments);

    this.state = {
      logs: [],
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    const socket = SocketIO(`${location.protocol}//${location.host}`);
    socket.on('log', this.handleNewLogEvent);
  }

  /**
   * New log event came in
   *
   * @param {LogData} log
   */
  handleNewLogEvent = (log: LogData) => {
    const logs = this.state.logs.slice();

    this.setState({
      logs: [...logs, log],
    });

    this.refs.logs.scrollTop = this.refs.logs.scrollHeight;
  }

  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    const { logs } = this.state;

    return (
      <div className={styles.logs} ref='logs'>
        {logs.map((log) => {
          return (<Log status={log.status} text={log.text} key={`log-${logs.indexOf(log)}`} />);
        })}
      </div>
    );
  }
}

export default Logs;
