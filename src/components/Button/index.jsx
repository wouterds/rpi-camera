//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';
import cx from 'classnames';

type Props = {
  text: string,
  onClick?: Function,
  className?: string,
};

class Button extends Component<Props>
{
  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    const { text, onClick, className } = this.props;

    return (
      <button className={cx(styles.button, className)} onClick={onClick}>{text}</button>
    );
  }
}

export default Button;
