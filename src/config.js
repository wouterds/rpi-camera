import styles from 'styles/core.css';

const Config = {
  staticFolder: 'public',
  httpPort: 3000,
  twemoji: {
    folder: 'svg',
    ext: '.svg',
    className: styles.emoji,
  },
};

module.exports = Config;
export default Config;
