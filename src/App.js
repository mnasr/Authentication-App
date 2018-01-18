import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDqgy9x5eujttmfCjIxSVGzqFKpFvgCaX0',
      authDomain: 'authentication-675dd.firebaseapp.com',
      databaseURL: 'https://authentication-675dd.firebaseio.com',
      projectId: 'authentication-675dd',
      storageBucket: 'authentication-675dd.appspot.com',
      messagingSenderId: '488850461402'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
           <CardSection>
             <Button onPress={() => firebase.auth().signOut()}>
               Log Out
             </Button>
           </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
