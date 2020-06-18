// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Font from 'expo-font';
// import Header from './components/Header/Header';
import {  Container, 
          Header, 
          Title, 
          Content, 
          Footer, 
          FooterTab, 
          Button, 
          Left, Right, Body, 
          Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {  AppLoading } from "expo";
import { Root } from "native-base";
class App extends Component {

   constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
FontAwesome: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf"),
MaterialIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf")

      // ...Ionicons.font,
    });
      this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (      
       <Container>
        <Header>
          <Left>
            <Button iconLeft transparent>
              <Icon name='menu' />
            </Button>
          </Left>

          <Body>
            <Title>Experimental</Title>
          </Body>
           <Right>
            <Button iconLeft transparent >
            <Text></ Text>
              <Icon type="MaterialIcons" name='translate' />
            </Button>
        
            <Button  iconLeft transparent>
            <Text></ Text>
              <Icon name='person-add' />
            </Button>
            <Button  iconLeft transparent>
            <Text></ Text>
              <Icon name='log-in' />
            </Button>
          </Right>
        </Header>
        <Content>



        </Content>
        <Footer>
          <FooterTab>
            <Button block full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
 
export default App;