
import React, { Component } from 'react';
import styles from './index.css';

export default class Page extends Component {
  render() {
      console.log(this);
      console.log(this.props);
    return (
      <div className={styles.Page}>
        <header>
          <h1>specs</h1>
          <p>peer into your ecs clusters</p>
            <button type="button" onClick={this.props.toggleGrid}>STUFF</button>
        </header>
        <div className={styles.PageContent}>
          {this.props.children}
        </div>
      </div>
    )
  }
};
