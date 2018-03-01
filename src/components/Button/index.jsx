//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';

type Props = {
  text: string,
  onClick: Function,
};

class Button extends Component<Props>
{
  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    const { text, onClick } = this.props;

    return (
      <button className={styles.button} onClick={onClick}>{text}</button>
    );
  }
}

export default Button;
