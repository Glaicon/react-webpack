import React from 'react'
import logo from './theme/images/logo.svg'
import './theme/css/app.css'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>Learn React with Webpack to creating initial bundles!</p>
          <p>Generate production and development bundles!</p>
        </header>
      </div>
    )
  }
}

export default App
