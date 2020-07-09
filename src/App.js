import React from 'react'

import { setStatus } from './notif'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      check: false,
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState(
      {
        check: e.target.checked,
      },
      () => {
        setStatus(this.state.check)
      }
    )
  }

  render() {
    return (
      <div>
        <label style={{ fontSize: '3rem' }}>
          <input
            type="checkbox"
            onChange={this.onChange}
            checked={this.state.check}
          />{' '}
          S'inscrire
        </label>
      </div>
    )
  }
}

export default App
