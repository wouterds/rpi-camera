//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';
import Camera from 'components/Camera';
import Logs from 'components/Logs';
import Controls from 'components/Controls';
import Footer from 'components/Footer';

class App extends Component<{}>
{
  /**
   * Render the component
   *
   * @returns {Node}
   */
  render(): Node {
    return (
      <div className={styles.app}>
        <main className={styles.content}>
          <div className={styles.left}>
            <Camera />
          </div>
          <div className={styles.right}>
            <Logs />
            <Controls />
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
