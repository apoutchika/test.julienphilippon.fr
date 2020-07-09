import React from 'react'

import { setStatus, getStatus, onChange } from './notif'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false,
    }

    this.onChange = this.onChange.bind(this)
  }

  async componentDidMount() {
    const status = await getStatus()
    this.setState({ status })

    onChange((status) => {
      console.log('onChange', status)
    })
  }

  onChange(e) {
    setStatus(this.state.status).then((status) => {
      this.setState({ status })
    })
  }

  render() {
    return (
      <div>
        <label style={{ fontSize: '3rem' }}>
          <input
            type="checkbox"
            onChange={this.onChange}
            checked={this.state.status}
          />{' '}
          S'inscrire
        </label>
      </div>
    )
  }
}

export default App
