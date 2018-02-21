import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

export default class LoginPage extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item style={styles.item}>
              <Input placeholder="Username" />
              </Item>
            <Item style={styles.item}>
              <Input placeholder="Password" />
            </Item>
            <Button style={styles.item} primary><Text> Entrar </Text></Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    width: 300
  }
});
