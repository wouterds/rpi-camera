import styles from 'styles/core.css';

const Config = {
  staticFolder: 'public',
  httpPort: 3000,
  servo: {
    pin: 'GPIO13',
    pos: {
      right:  0.03125, // Hardcoded value found by testing
      left: 0.11875, // Hardcoded value found by testing
      middle: 0.0750, // Hardcoded value found by testing
      off: 0,
    },
    step: 0.00625,
    delay: 150,
  },
  twemoji: {
    folder: 'svg',
    ext: '.svg',
    className: styles.emoji,
  },
};

module.exports = Config;
export default Config;
