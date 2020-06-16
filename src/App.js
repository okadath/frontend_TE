// import React from 'react';
// import { PayPalButton } from "react-paypal-button-v2";

// export default class ExampleComponent extends React.Component  {
//   render() {
//     return (
//       <PayPalButton
//         amount="0.01"
//         // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
//         onSuccess={(details, data) => {
//           alert("Transaction completed by " + details.payer.name.given_name);

//           // OPTIONAL: Call your server to save the transaction
//           return fetch("/paypal-transaction-complete", {
//             method: "post",
//             body: JSON.stringify({
//               orderID: data.orderID
//             })
//           });
//         }}
//       />
//     );
//   }
// }


// import React from 'react';
// import { AppLoading } from 'expo';
// import { Container, Text } from 'native-base';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isReady: false,
//     };
//   }

//   async componentDidMount() {
//     await Font.loadAsync({
//       Roboto: require('native-base/Fonts/Roboto.ttf'),
//       Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
//       ...Ionicons.font,
//     });
//     this.setState({ isReady: true });
//   }

//   render() {
//     if (!this.state.isReady) {
//       return <AppLoading />;
//     }

//     return (
//       <Container>
//         <Text>Open up App.js to start working on your app!</Text>
//       </Container>
//     );
//   }
// }
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Font from 'expo-font';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Navigation from './components/Navigation';
import Get_demo from './components/Get_demo';
import Header from './components/Header/Header';
class App extends Component {
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf")
      // ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  render() {
    return (      
       <BrowserRouter>
        <div className="App">
         <Header />
          <Navigation />
            <Switch>

             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact}/>
             <Route path="/get_videos" component={Get_demo}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;