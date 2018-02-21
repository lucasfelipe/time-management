// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './src/pages/LoginPage';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginPage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
