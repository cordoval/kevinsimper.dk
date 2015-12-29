import React, { Component } from 'react'
import data from './data.json'
import styles from './style.scss'

export default class Presentations extends Component {
  render() {
    return (
      <div>
        <h2 className={styles.Header}>Presentations</h2>
        <div>These are the presentations I have done.</div>
        <div>
          {data.presentations.map((presentation) => {
            return (
              <div className={styles.Presentation}>
                <div className={styles.Name}>{presentation.name}</div>
                <div className={styles.Location}>{presentation.location}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
