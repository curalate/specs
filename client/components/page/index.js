
import React, { Component } from 'react';
import styles from './index.css';

export default class Page extends Component {
  render() {
    return (
      <div className={styles.Page}>
        <header>
          <h1>specs</h1>
          <p>peer into your ecs clusters</p>
            <button type="button" className={styles.viewer} onClick={this.props.toggleGrid}>grid / list view</button>
        </header>
        <div className={styles.PageContent}>
          {this.props.children}
        </div>
      </div>
    )
  }
};
