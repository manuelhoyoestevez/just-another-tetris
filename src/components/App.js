import React, { Component } from 'react';

import { Header } from './Header';
import { Navigation } from './Navigation';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appTitle: 'awesome',
      navigation: [
        {
          label: 'Go to Google',
          href: 'http://www.google.es'
        },
        {
          label: 'Go to Marca',
          href: 'http://www.marca.com'
        }
      ]
    };
  }

  render() {
    const { appTitle, navigation } = this.state;
    return (
      <div>
        <Header title={appTitle} />
        <Navigation items={navigation} />
      </div>
    );
  }
}
