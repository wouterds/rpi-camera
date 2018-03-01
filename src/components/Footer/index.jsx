//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';
import axios from 'axios';
import { isoCountries } from 'config';
import EmojiFlags from 'emoji-flags';

type Props = {};

type State = {
  visitorInfo: {
    country: string,
    region: string,
    ip: string,
    userAgent: string,
  },
};

class Footer extends Component<Props, State>
{
  constructor() {
    super(...arguments);

    this.state = {
      visitorInfo: {
        country: 'loading',
        region: 'loading',
        ip: 'loading',
        userAgent: 'loading',
      },
    };
  }

  /**
   * Component was mounted
   */
  async componentDidMount() {
    const { data } = await axios.get('http://ipinfo.io');

    const visitorInfo = {
      userAgent: window.navigator.userAgent,
      ...data,
    };

    this.setState({ visitorInfo });
  }

  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    const { visitorInfo } = this.state;
    const emojiFlag = visitorInfo.country !== 'loading' ? EmojiFlags.countryCode(visitorInfo.country) : null;

    return (
      <footer className={styles.footer}>
        {`Connected from ${visitorInfo.ip}, ${visitorInfo.region}, ${emojiFlag ? emojiFlag.name : ''} ${emojiFlag ? emojiFlag.emoji : ''}`}
        <br />
        {visitorInfo.userAgent}
      </footer>
    );
  }
}

export default Footer;
